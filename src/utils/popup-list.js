// import iconPositive from '../images/icon-positive.svg'

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
}

const popupConfirmation = {
  name: 'confirmation',
  title: 'Вы уверены?',
  buttonTextDefault: 'Да',
  buttonTextLoading: 'Удаление...',
}

const popupInfo = {
  name: 'info',
  title: 'Вы успешно зарегистрировались!',
  // iconPositive: iconPositive,
}

const popupImage = {
  name: 'img',
  // iconPositive: iconPositive,
}

export { popupProfile, popupCard, popupAvatar, popupConfirmation, popupInfo, popupImage };