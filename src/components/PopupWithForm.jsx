// import React, { useRef, useEffect, useState } from 'react';
import React from 'react';
import Popup from './Popup';
import Form from './Form';

export default function PopupWithForm({
  isLoading,
  options,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  const { name, title, buttonTextDefault, buttonTextLoading } = options ?? '';

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <h2 className={`popup__heading popup__heading_type_${name}`}>{title}</h2>
      <Form
        isOpen={isOpen}
        name={name}
        buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
        onSubmit={onSubmit}
      >
        {children ?? ''}
      </Form>
    </Popup>
  );
}
