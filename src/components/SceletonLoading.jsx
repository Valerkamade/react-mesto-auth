import React from 'react';

export default function SceletonCard() {
  return (
    <li className='gallery__item'>
      <div className='gallery__info'>
        <h2 className='gallery__title gallery__title_sceleton'>&nbsp;</h2>
        <div className='gallery__like-wrapper'>
          <button className='gallery__button-like button gallery__button-like_sceleton' />
          <span className='gallery__likes-count gallery__likes-count_sceleton'>&nbsp;</span>
        </div>
      </div>
      <img className='gallery__photo gallery__photo_sceleton' src='#' alt='' />
    </li>
  );
}
