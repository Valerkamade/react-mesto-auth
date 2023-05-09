import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as auth from '../utils/auth';

export default function Login(
 { name,
  title,
  children,
  buttonText,
  onSubmit,
  handleLogin}
) {
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!value.email || !value.password) {
      return;
    }
    auth
      .authorize(value)
      .then((data) => {
        if (data.token) {
          setValue({ [evt.target.name]: '' });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='sign'>
      <h2 className='sign__title title'>Вход</h2>
      <form
        className={`sign__form sign__form_type_${name}`}
        name={name}
        noValidate
        onSubmit={handleSubmit}
        // ref={formRef}
      >
        <label className=''>
          <input
            className='sign__input'
            type='email'
            name='email'
            placeholder='Email'
            minLength='2'
            maxLength='40'
            required
            value={value.email ?? ''}
            onChange={handleChange}
          />
          <span className='sign__error email-error'></span>
        </label>

        <label className=''>
          <input
            className='sign__input'
            type='password'
            name='password'
            placeholder='Пароль'
            minLength='2'
            maxLength='200'
            required
            value={value.password ?? ''}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className='sign__error password-error'></span>
        </label>
        <button
          className='sign__button-save button'
          type='submit'
        >
          Войти
        </button>
      </form>
    </div>
  );
}
