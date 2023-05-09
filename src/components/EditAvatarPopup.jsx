import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { popupAvatar } from '../utils/popup-list';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
  onMouseDown,
  value,
  setValue,
}) {
  // const { inputs } = popupAvatar;

  useEffect(() => {
    isOpen && setValue({});
  }, [isOpen, setValue]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(value);
  }

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  return (
    <PopupWithForm
      isLoading={isLoading}
      // name={name}
      // title={title}
      // buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
      options={popupAvatar}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
    >
      {popupAvatar.inputs.map((input) => (
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
