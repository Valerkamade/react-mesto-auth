import React from 'react';
import PopupWithForm from './PopupWithForm';
import { popupConfirmation } from '../utils/popup-list';

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
      isLoading={isLoading}
      options={popupConfirmation}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
    />
  );
}
