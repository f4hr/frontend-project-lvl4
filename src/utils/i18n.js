// @ts-check

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales/index.js';

export default async ({ language }) => {
  const i18nInstance = i18n.createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      debug: process.env.NODE_ENV === 'development',
      lng: language,
      fallbackLng: language,
      whitelist: ['ru', 'en'],
      ns: ['translation'],
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  return i18nInstance;
};
