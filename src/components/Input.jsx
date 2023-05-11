import React from 'react';

export default function Input({ value, handleChange, input }) {
  const { name, type, placeholder, minLength, maxLength } = input;

  return (
    <label className='form__label'>
      <input
        className={`form__input${
          name === 'register' || name === 'login' ? ' form__input_type_auth' : ''
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        minLength={minLength ?? ''}
        maxLength={maxLength ?? ''}
        required
        value={value ?? ''}
        onChange={handleChange}
        autoComplete='off'
      />
      <span className={`form__error ${name}-error`} />
    </label>
  );
}
