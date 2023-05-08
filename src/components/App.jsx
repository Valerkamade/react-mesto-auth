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

import * as auth from '../utils/auth';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const navigate = useNavigate();

  const handlerEsc = (evt) => {
    evt.key === 'Escape' && closeAllPopups();
  };

  const handleOverlayClose = (evt) => {
    evt.target === evt.currentTarget && closeAllPopups();
  };

  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => console.log(err));
  }, []);

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
        .catch();
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('keydown', handlerEsc);
    return () => {
      document.removeEventListener('keydown', handlerEsc);
    };
  }, []);

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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
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

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        email={emailUser}
        // link={<Login /> ? '/sign-up' : '/sign-in'}
        loggedIn={loggedIn}
      />

      <Routes>
        <Route path='/' element=''>
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
              />
            }
          />
          <Route path='sign-up' element={<Register name='registration' />} />
          <Route path='sign-in' element={<Login handleLogin={handleLogin} />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>

      {/* <Routes>
        <Route
          path='/'
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
            />
          }
        />
        <Route path='/sign-up' element={<Register name='registration' />} />
        <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
      </Routes> */}

      {loggedIn && <Footer />}

      {loggedIn && (
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onMouseDown={handleOverlayClose}
        />
      )}

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
        onMouseDown={handleOverlayClose}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
        onMouseDown={handleOverlayClose}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        onMouseDown={handleOverlayClose}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleCardDelete}
        isLoading={isLoading}
        onMouseDown={handleOverlayClose}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
