import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as auth from '../utils/auth';

export default function Register(name, title, children, buttonText, onSubmit) {
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (value.password) {
      auth.register(value).then(() => {
        navigate('/sigh-in', { replace: true });
      });
    }
    setValue({ [evt.target.name]: '' });
  }

  return (
    <div className='sign'>
      <h2 className='sign__title title'>Регистрация</h2>
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
          />
          <span className='sign__error password-error'></span>
        </label>
        <button
          className='sign__button-save button'
          type='submit'
          // disabled={!isValidForm}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='sign__wrapper'>
        <p className='sign__text'>Уже зарегистрированы?&nbsp;</p>
        <Link className='sign__link' to='/sign-in'>
          Войти
        </Link>
      </div>
    </div>
  );
}
