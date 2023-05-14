import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ loggedIn, email, setLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  const path = location.pathname === '/sign-in' ? '/sign-up' : '/sign-in';

  function onSignOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: 'true' });
    setMenuActive(false);
    setLoggedIn(false);
  }

  function handleMenuClick() {
    setMenuActive(!menuActive);
  }

  return (
    <header
      className={`header page__container ${menuActive && `header_active`} ${
        loggedIn && `header_login`
      }`}
    >
      <Link className='header__link' to='/'>
        <img className='header__logo' src={logo} alt='Место Россия' />
      </Link>
      
      {!loggedIn ? (
        <Link to={path} className='header__link'>
          {location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}
        </Link>
      ) : (
        <>
          <div className='header__wrapper'>
            <span className='header__text'>{email}</span>
            <button className='header__button-logout button' onClick={onSignOut}>
              Выйти
            </button>
          </div>
          <button
            className={`header__button-toggle button ${
              menuActive && `header__button-toggle_active`
            }`}
            type='button'
            aria-label='Окрыть меню'
            onClick={handleMenuClick}
          >
            <span className='header__button-lines'></span>
          </button>
        </>
      )}
    </header>
  );
}
