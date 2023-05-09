import React from 'react';
import Popup from './Popup';
import { popupImage } from '../utils/popup-list';

export default function ImagePopup({ card, isOpen, onClose }) {
  const { name } = popupImage;
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <h2 className='popup__title'>{card.name}</h2>
      <img className='popup__photo' src={card.link} alt={card.name} />
    </Popup>
  );
}
