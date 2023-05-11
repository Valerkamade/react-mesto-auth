import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import Input from './Input';
import { formRegister } from '../utils/data-list';

export default function Register({ isLoading, onRegister, value, setValue }) {
  const { name, title, buttonTextLoading, buttonTextDefault } = formRegister;

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister();
  }

  return (
    <div className='auth'>
      <h1 className='auth__title'>{title}</h1>
      <Form
        isOpen={true}
        name={name}
        buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
        onSubmit={handleSubmit}
      >
        {formRegister.inputs.map((input) => (
          <Input
            key={input.name}
            value={value[`${input.name}`]}
            input={input}
            handleChange={handleChange}
          />
        ))}
      </Form>
      <div className='auth__wrapper'>
        <p className='auth__text'>Уже зарегистрированы?&nbsp;</p>
        <Link className='auth__link' to='/sign-in'>
          Войти
        </Link>
      </div>
    </div>
  );
}
