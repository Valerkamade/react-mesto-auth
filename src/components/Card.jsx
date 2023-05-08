import React, { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const cardLikeButtonClassName = `gallery__button-like button ${
    isLiked && 'gallery__button-like_active'
  }`;
  const isOwn = card.owner._id === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <li className='gallery__item'>
        {isOwn && (
          <button
            className='gallery__button-trash button'
            onClick={handleDeleteClick}
          />
        )}
        <div className='gallery__info'>
          <h2 className='gallery__title'>{card.name}</h2>
          <div className='gallery__like-wrapper'>
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            />
            <span className='gallery__likes-count'>{card.likes.length}</span>
          </div>
        </div>
        <img
          className='gallery__photo'
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
      </li>
    </CurrentUserContext.Provider>
  );
}
