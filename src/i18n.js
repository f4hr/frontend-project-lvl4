// @ts-check

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';

const resources = {
  ru,
};

const i18nextInstance = i18n.createInstance();

i18nextInstance
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'production',
    lng: 'ru',
    fallbackLng: 'ru',
    ns: ['translation'],
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18nextInstance;
