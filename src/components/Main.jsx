import React, { useContext} from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile page__profile'>
        <div className='profile__wrapper'>
          <div className='profile__name-edit'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__button-edit button'
              type='button'
              aria-label='Изменить аватар'
              onClick={onEditProfile}
            ></button>
          </div>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button className='profile__button-avatar' onClick={onEditAvatar}>
          <img
            className='profile__avatar'
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </button>
        <button
          className='profile__button-add button'
          type='button'
          aria-label='Добавить место'
          onClick={onAddPlace}
        ></button>
      </section>

      <section className='gallery page__gallery' aria-label='Галерея'>
        <ul className='gallery__list'>
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
