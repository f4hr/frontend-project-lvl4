export default {
  translation: {
    errors: {
      network: 'Ошибка сети',
    },
    form: {
      cancel: 'Отменить',
      submit: 'Отправить',
      errors: {
        required: 'Обязательное поле',
        min: 'Не менее {{min}} символов',
        max: 'От {{min}} до {{max}} символов',
        unique: 'Должно быть уникальным',
        passwordMatch: 'Пароли должны совпадать',
        whitespace: 'Поле не может содержать только пробелы',
      },
    },
    channels: {
      title: 'Каналы',
      newChannel: 'Добавить новый канал',
      removeChannel: 'Удалить',
      renameChannel: 'Переименовать',
      loading: 'Загрузка...',
      errors: {
        load: 'Не удалось загрузить каналы',
      },
    },
    messages: {
      loading: 'Загрузка...',
      noMessages: 'В этом канале пока нет сообщений',
      errors: {
        load: 'Не удалось загрузить сообщения',
      },
    },
    nav: {
      logIn: 'Войти',
      logOut: 'Выйти',
    },
    logIn: {
      title: 'Войти',
      signUpText: 'Нет аккаунта',
      signUpLink: 'Регистрация',
    },
    logInForm: {
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      errors: {
        auth: 'Неверные имя пользователя или пароль',
      },
    },
    signUp: {
      title: 'Регистрация',
    },
    signUpForm: {
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      errors: {
        unique: 'Такой пользователь уже существует',
      },
    },
    newMessageForm: {
      messagePlaceholder: 'Введите сообщение...',
    },
    newChannelModal: {
      title: 'Добавить канал',
    },
    newChannelForm: {
      namePlaceholder: 'Название канала',
      submit: 'Добавить',
      errors: {
        unique: 'Канал с таким именем уже существует',
      },
    },
    removeChannelModal: {
      title: 'Удалить канал',
      description: 'Удалить канал "{{name}}"?',
    },
    removeChannelForm: {
      submit: 'Удалить',
    },
    renameChannelModal: {
      title: 'Переименовать канал',
    },
    renameChannelForm: {
      namePlaceholder: 'Новое название канала',
      submit: 'Переименовать',
      errors: {
        unique: 'Канал с таким именем уже существует',
      },
    },
  },
};
