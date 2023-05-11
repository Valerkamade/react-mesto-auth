import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { popupCard } from '../utils/data-list';

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
  onMouseDown,
  value,
  setValue,
}) {
  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(value);
  }

  return (
    <PopupWithForm
      isLoading={isLoading}
      options={popupCard}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
    >
      {popupCard.inputs.map((input) => (
        <Input
          key={input.name}
          value={value[`${input.name}`]}
          input={input}
          handleChange={handleChange}
        />
      ))}
    </PopupWithForm>
  );
}
