import React from 'react';

export default function Footer() {
const yearNow = new Date().getFullYear();

  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; 2022-{yearNow} Mesto Russia</p>
    </footer>
  );
}
