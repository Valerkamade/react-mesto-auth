import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import Error from './Error';
import InfoTooltip from './InfoTooltip';

import * as auth from '../utils/auth';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const [valueProfile, setValueProfile] = useState({});
  const [valueCard, setValueCard] = useState({});
  const [valueAvatar, setValueAvatar] = useState({});
  const [valueRegister, setValueRegister] = useState({});
  const [valueLogin, setValueLogin] = useState({});

  const navigate = useNavigate();

  function handleRegister() {
    if (valueRegister.password || valueRegister.email) {
      auth
        .register(valueRegister)
        .then((res) => {
          handleInfoTooltipPositive();
          navigate('/sign-in', { replace: true });
          setValueRegister({});
        })
        .catch((err) => {
          return err.then((res) => handleInfoTooltipNegative(res));
        });
    }
  }

  function handleLogin() {
    if (!valueLogin.email || !valueLogin.password) {
      return;
    }
    auth
      .authorize(valueLogin)
      .then((data) => {
        if (data.token) {
          setValueLogin({ valueLogin });
          navigate('/', { replace: true });
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        return err.then((res) => handleInfoTooltipNegative(res));
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/', { replace: true });
            setEmailUser(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCards(card);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     const jwt = localStorage.getItem('jwt');
  //     if (jwt) {
  //       auth
  //         .checkToken(jwt)
  //         .then((res) => {
  //           Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
  //             .then(([user, card]) => {
  //               setCurrentUser(user);
  //               setCards(card);
  //             })
  //             .catch((err) => console.log(err));
  //           if (res) {
  //             setLoggedIn(true);
  //             navigate('/', { replace: true });
  //             setEmailUser(res.data.email);
  //           }
  //         })
  //         .catch();
  //     }
  //   }
  // }, [loggedIn, navigate]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletClick() {
    setIsConfirmationPopupOpen(true);
  }

  function handleInfoTooltipPositive() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleInfoTooltipNegative({ error, message }) {
    setIsInfoTooltipPopupOpen(true);
    setErrorMessage(message || error);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .toggleLikeCardApi(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCardApi(selectedCard._id)
      .then(() => {
        closeAllPopups();
        setTimeout(() => {
          setCards(cards.filter((item) => item._id !== selectedCard._id));
        }, 500);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(value) {
    setIsLoading(true);
    api
      .setUserInfoApi(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setValueProfile({});
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    api
      .setUserAvatarApi(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setValueAvatar({});
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(value) {
    setIsLoading(true);
    api
      .addNewCardApi(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setValueCard({});
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handle(card) {
    handleDeletClick(card);
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={emailUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Routes>
        {/* <Route
          path='/'
          element={
            loggedIn ? (
              <Navigate to='/' replace />
            ) : (
              <Navigate to='/sign-up' replace />
            )
          }
        /> */}
        <Route
          index
          element={
            <ProtectedRouteElement
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handle}
              cards={cards}
              loggedIn={loggedIn}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path='/sign-up'
          element={
            <Register
              name='registration'
              onRegister={handleRegister}
              value={valueRegister}
              setValue={setValueRegister}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <Login
              onLogin={handleLogin}
              value={valueLogin}
              setValue={setValueLogin}
              isLoading={isLoading}
            />
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>

      {loggedIn && <Footer />}

      {loggedIn && (
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          value={valueProfile}
          setValue={setValueProfile}
        />
      )}

      {loggedIn && (
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          value={valueAvatar}
          setValue={setValueAvatar}
        />
      )}

      {loggedIn && (
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          value={valueCard}
          setValue={setValueCard}
        />
      )}

      {loggedIn && (
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      )}

      {loggedIn && (
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
        />
      )}

      {loggedIn && (
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
