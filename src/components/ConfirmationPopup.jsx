import React from 'react';
import PopupWithForm from './PopupWithForm';


export default function ConfirmationPopup({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  onMouseDown,
}) {

  function handleSubmit(evt) {
    evt.preventDefault();

    onConfirm();
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
    />
  );
}
