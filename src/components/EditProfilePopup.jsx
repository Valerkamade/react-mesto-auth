import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
  onMouseDown,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [value, setValue] = useState({});

  useEffect(() => {
    isOpen &&
      setValue({
        name: currentUser.name,
        about: currentUser.about,
      });
  }, [currentUser, isOpen]);

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(value);

    setValue({ [evt.target.name]: '' });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText={isLoading ? 'Сохранение...' :'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
    >
      <label className='popup__label'>
        <input
          className='popup__input popup__input_type_name'
          type='text'
          name='name'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          required
          value={value.name ?? ''}
          onChange={handleChange}
        />
        <span className='popup__error name-error'></span>
      </label>

      <label className='popup__label'>
        <input
          className='popup__input popup__input_type_job'
          type='text'
          name='about'
          placeholder='Вид деятельности'
          minLength='2'
          maxLength='200'
          required
          value={value.about ?? ''}
          onChange={handleChange}
        />
        <span className='popup__error about-error'></span>
      </label>
    </PopupWithForm>
  );
}
