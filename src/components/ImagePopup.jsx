import React from 'react';

export default function ImagePopup({ card, isOpen, onClose, onMouseDown }) {
  const className = `popup popup_type_img ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={className} onMouseDown={onMouseDown}>
      <div className='popup__container popup__container_type_img'>
        <h2 className='popup__title'>{card.name}</h2>
        <img className='popup__photo' src={card.link} alt={card.name} />
        <button
          className='popup__button-close button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        />
      </div>
    </div>
  );
}
