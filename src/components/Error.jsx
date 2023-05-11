import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='page__container'>
      <h1 className=''>
        404.
        <br />
        <small>Страница не найдена</small>
      </h1>
      <Link to='/'>Go to main page</Link>
    </div>
  );
}
