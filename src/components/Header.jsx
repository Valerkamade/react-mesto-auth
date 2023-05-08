import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ loggedIn, email }) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname === '/sign-in' ? '/sign-up' : '/sign-in';

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in', {replace: 'true'});
  }

  return (
    <header className='header page__header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Место Россия' />
      </Link>
      {!loggedIn ? (
        <Link to={path} className='header__login'>
          {path !== '/sign-in' ? 'Регистрация' : 'Войти'}
        </Link>
      ) : (
        <div className='header__wrapper'>
          <p className='header__text'>{email}</p>
          <Link className='header__link' onClick={signOut}>
            Выход
          </Link>
        </div>
      )}
    </header>
  );
}
