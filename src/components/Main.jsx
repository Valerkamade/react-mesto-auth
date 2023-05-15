import React, { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import SceletonCard from './SceletonLoading';
import { initialCards } from '../utils/utils';
import Profile from './Profile';
import SceletonProfile from './SceletonProfile';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  isLoading,
  loggedIn,
  isLoadingContent,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardList = isLoadingContent ? initialCards : cards;

  return (
    <main className='main'>
      {isLoadingContent ? (
        <SceletonProfile />
      ) : (
        <Profile
          currentUser={currentUser}
          onEditProfile={onEditProfile}
          onEditAvatar={onEditAvatar}
          onAddPlace={onAddPlace}
        />
      )}
      <section className='gallery page__container' aria-label='Галерея'>
        <ul className='gallery__list'>
          {cardList.map((card, index) =>
            isLoadingContent ? (
              <SceletonCard key={index} />
            ) : (
              <Card
                card={card}
                onCardClick={onCardClick}
                key={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          )}
        </ul>
      </section>
    </main>
  );
}
