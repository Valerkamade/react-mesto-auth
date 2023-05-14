import React from 'react';
import { formLogin } from '../utils/data-list';
import Input from './Input';
import Form from './Form';

export default function Login({
  isLoading,
  value,
  setValue,
  onLogin,
}) {
  const { name, title, buttonTextLoading, buttonTextDefault } = formLogin;

  //TODO: попробовать вынести в отдельный модуль или хук вместе с сабмитом
  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin();
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
        {formLogin.inputs.map((input) => (
          <Input
            key={input.name}
            value={value[`${input.name}`]}
            input={input}
            handleChange={handleChange}
          />
        ))}
      </Form>
    </div>
  );
}
