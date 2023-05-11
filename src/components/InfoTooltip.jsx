import React from 'react';
import { ReactComponent as IconPositive } from '../images/icon-positive.svg';
import { ReactComponent as IconNegative } from '../images/icon-negative.svg';
import Popup from './Popup';
import { popupInfo } from '../utils/data-list';

export default function InfoTooltip({ onClose, isOpen, errorMessage }) {
  const { name, title } = popupInfo;
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      {!errorMessage ? <IconPositive /> : <IconNegative />}
      <h2 className={`popup__heading popup__heading_type_${name}`}>
        {!errorMessage ? title : `${errorMessage}`}
      </h2>
    </Popup>
  );
}
