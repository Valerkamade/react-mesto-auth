import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
  onMouseDown,
}) {
  const [values, setValues] = useState({});

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);

    setValues({ [evt.target.name]: '' });
  }

  return (
    <PopupWithForm
      name='place'
      title='Новое место'
      buttonText={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
    >
      <label className='popup__label'>
        <input
          className='popup__input popup__input_type_title'
          type='text'
          name='name'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
          value={values.name ?? ''}
          onChange={handleChange}
        />
        <span className='popup__error name-error'></span>
      </label>

      <label className='popup__label'>
        <input
          className='popup__input popup__input_type_link'
          type='url'
          name='link'
          placeholder='Ссылка на картинку'
          required
          value={values.link ?? ''}
          onChange={handleChange}
        />
        <span className='popup__error link-error'></span>
      </label>
    </PopupWithForm>
  );
}
