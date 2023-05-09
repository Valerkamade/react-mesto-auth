import React from 'react';

export default function Input({ value, handleChange, input }) {
  const { name, type, placeholder, minLength, maxLength } = input;

  return (
    <label className='popup__label'>
      <input
        className={`popup__input popup__input_type_${name}`}
        type={type}
        name={name}
        placeholder={placeholder}
        minLength={minLength ?? ''}
        maxLength={maxLength ?? ''}
        required
        value={value ?? ''}
        onChange={handleChange}
        autoComplete="off"
      />
      <span className={`popup__error ${name}-error`} />
    </label>
  );
}
