import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { popupProfile } from '../utils/data-list';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
  onMouseDown,
  value,
  setValue,
}) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    isOpen &&
      setValue({
        name: currentUser.name,
        about: currentUser.about,
      });
  }, [currentUser, isOpen, setValue]);

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(value);
  }

  return (
    <PopupWithForm
      isLoading={isLoading}
      options={popupProfile}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
    >
      {popupProfile.inputs.map((input) => (
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
