import React from 'react';

export default function Profile({
  currentUser,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
}) {
  return (
    <section className='profile page__container'>
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
  );
}
