import { useEffect } from 'react';

export default function Popup({ isOpen, onClose, name, children }) {
  useEffect(() => {
    const handleCloseEscape = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    isOpen && document.addEventListener('keydown', handleCloseEscape);
    return () => document.removeEventListener('keydown', handleCloseEscape);
  }, [isOpen, onClose]);

  const handleCloseOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleCloseOverlay}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        {children}
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
