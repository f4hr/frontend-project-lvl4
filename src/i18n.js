// @ts-check

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';

const resources = {
  ru,
  en,
};

const i18nextInstance = i18n.createInstance();

i18nextInstance
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    lng: 'ru',
    fallbackLng: 'ru',
    ns: ['translation'],
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18nextInstance;
