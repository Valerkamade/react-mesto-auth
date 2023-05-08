// import React from 'react';
import React, { useRef, useEffect, useState } from 'react';

export default function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  isValidity,
  onMouseDown,
}) {
  const className = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;
  const [isValidForm, setIsValidForm] = useState(false);
  const formRef = useRef(0);

  useEffect(() => {
    Array.from(formRef.current)
      .filter((item) => {
        return item.localName !== 'button';
      })
      .forEach((item) => {
        item.classList.toggle('popup__input_type_error', item.validationMessage);
        (item.nextSibling.textContent = item.validationMessage);
      });

    function validation() {
      if (children === undefined) {
        return true;
      }
      if (formRef.current.name.avatar) {
        isValidity();
      }
      return formRef.current.checkValidity();
    }

    isOpen && setIsValidForm(validation());
  }, [children, isOpen, isValidity]);


  return (
    <div className={className} onMouseDown={onMouseDown}>
      <div className='popup__container'>
        <h2 className='popup__heading'>{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          method='post'
          name={name}
          autoComplete='off'
          noValidate
          onSubmit={onSubmit}
          ref={formRef}
        >
          {children}
          <button
            className='popup__button-save button'
            type='submit'
            disabled={!isValidForm}
          >
            {buttonText}
          </button>
        </form>
        <button
          className='popup__button-close button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        />
      </div>
    </div>
  );
}
