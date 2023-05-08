import React, { useEffect, useRef, useState } from 'react';
// import React, { useContext, useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

// import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
  onMouseDown,
}) {
  // const currentUser = useContext(CurrentUserContext);
  const [isValidity, setIsValidity] = useState(true);
  const inputRef = useRef(0);

  useEffect(() => {
    isOpen && (inputRef.current.value = '');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  function handleChange() {
    setIsValidity(inputRef.current.checkValidity());
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValidity={isValidity}
      onMouseDown={onMouseDown}
    >
      <label className='popup__label'>
        <input
          className={`popup__input popup__input_type_avatar ${
            !isValidity && 'popup__input_type_error'
          }`}
          type='url'
          name='avatar'
          placeholder='Ссылка на аватар'
          required
          ref={inputRef}
          onChange={(evt) => handleChange(evt.target.value)}
        />
        <span className='popup__error avatar-error'></span>
      </label>
    </PopupWithForm>
  );
}
