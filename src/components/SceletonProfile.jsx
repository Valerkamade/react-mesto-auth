import React from 'react';

export default function SceletonProfile() {
  return (
    <section className='profile page__container'>
      <div className='profile__wrapper'>
        <div className='profile__name-edit'>
          <h1 className='profile__name profile__name_sceleton'>&nbsp;</h1>
          <button
            className='profile__button-edit button profile__button-edit_sceleton'
            type='button'
            aria-label='Изменить аватар'
          ></button>
        </div>
        <p className='profile__job profile__job_sceleton'>&nbsp;</p>
      </div>
      <button className='profile__button-avatar profile__button-avatar_sceleton'></button>
      <button
        className='profile__button-add profile__button-add_sceleton button'
        type='button'
        aria-label='Добавить место'
      ></button>
    </section>
  );
}
