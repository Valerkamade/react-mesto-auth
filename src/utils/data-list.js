// import iconPositive from '../images/icon-positive.svg'
// import iconNegative from '../images/icon-negative.svg'

const popupProfile = {
  name: 'profile',
  title: 'Редактировать профиль',
  buttonTextDefault: 'Сохранить',
  buttonTextLoading: 'Сохранение...',
  inputs: [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Имя',
      minLength: '2',
      maxLength: '40',
    },
    {
      type: 'text',
      name: 'about',
      placeholder: 'Вид деятельности',
      minLength: '2',
      maxLength: '200',
    },
  ]
};

const popupCard = {
  name: 'place',
  title: 'Новое место',
  buttonTextDefault: 'Создать',
  buttonTextLoading: 'Создание...',
  inputs: [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Название',
      minLength: '2',
      maxLength: '30',
    },
    {
      type: 'url',
      name: 'link',
      placeholder: 'Ссылка на картинку',
    },
  ]
};

const popupAvatar = {
  name: 'avatar',
  title: 'Обновить аватар',
  buttonTextDefault: 'Сохранить',
  buttonTextLoading: 'Сохранение...',
  inputs: [
    {
      type: 'url',
      name: 'avatar',
      placeholder: 'Ссылка на аватар',
    },
  ]
};

const popupConfirmation = {
  name: 'confirmation',
  title: 'Вы уверены?',
  buttonTextDefault: 'Да',
  buttonTextLoading: 'Удаление...',
};

const popupInfo = {
  name: 'info',
  title: 'Вы успешно зарегистрировались!',
  // iconPositive: iconPositive,
  // iconNegative: iconNegative,
};

const popupImage = {
  name: 'img',
};

const formRegister = {
  name: 'register',
  title: 'Регистрация',
  buttonTextDefault: 'Зарегистрироваться',
  buttonTextLoading: 'Регистрация...',
  inputs: [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      minLength: '5',
      maxLength: '40',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      minLength: '4',
      maxLength: '40',
    },
  ]
};

const formLogin = {
  name: 'login',
  title: 'Вход',
  buttonTextDefault: 'Войти',
  buttonTextLoading: 'Вход...',
  inputs: [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      minLength: '4',
      maxLength: '40',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      minLength: '4',
      maxLength: '40',
    },
  ]
};

export {
  popupProfile,
  popupCard,
  popupAvatar,
  popupConfirmation,
  popupInfo,
  popupImage,
  formRegister,
  formLogin
};