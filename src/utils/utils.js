// Данные для валидации
const objectData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Данные для запроса на сервер
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'bc0a2640-5424-4c06-abb5-a57662fac618',
    'Content-Type': 'application/json'
  }
}

// Экспорт данных
export { objectData, apiConfig }