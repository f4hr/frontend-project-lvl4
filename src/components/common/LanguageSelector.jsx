// @ts-check

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { changeLanguage } from '../../slices/appSlice.js';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.app);
  const locales = {
    ru: 'Русский',
    en: 'English',
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  const handleLangSelect = (eventKey) => {
    dispatch(changeLanguage({ lang: eventKey }));
  };

  return (
    <DropdownButton
      className="mr-2"
      variant="secondary"
      title={locales[lang]}
      renderMenuOnMount
    >
      <Dropdown.Header>{t('lang.description')}</Dropdown.Header>
      <Dropdown.Item
        as="button"
        eventKey="ru"
        onSelect={handleLangSelect}
        active={lang === 'ru'}
      >
        Русский
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="en"
        onSelect={handleLangSelect}
        active={lang === 'en'}
      >
        English
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default LanguageSelector;
