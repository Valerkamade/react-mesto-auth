import React, { useRef, useEffect, useState } from 'react';

export default function Form({ children, name, onSubmit, isOpen, buttonText }) {
  const [isValidForm, setIsValidForm] = useState(false);
  const formRef = useRef(0);

  useEffect(() => {
    Array.from(formRef.current)
      .filter((item) => {
        return item.localName !== 'button';
      })
      .forEach((item) => {
        item.classList.toggle('form__input_type_error', item.validationMessage);
        item.nextSibling.textContent = item.validationMessage;
      });

    function validation() {
      if (children === undefined) {
        return true;
      }
      return formRef.current.checkValidity();
    }
    isOpen && setIsValidForm(validation());
  }, [children, isOpen]);

  return (
    <form
      className={`form form_type_${name}`}
      name={name}
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
    >
      {children}
      <button
        className={`form__button-save button${
          name === 'register' || name === 'login'
            ? ' form__button-save_type_auth'
            : ''
        }`}
        type='submit'
        disabled={!isValidForm}
      >
        {buttonText}
      </button>
    </form>
  );
}
