import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='error page__container'>
      <h1 className='error__title'>Ошибка 404</h1>
      <p className='error__subtitle'>Страница не найдена</p>
      <Link className='error__link' to='/'>
        Перейти на главную страницу
      </Link>
    </div>
  );
}
