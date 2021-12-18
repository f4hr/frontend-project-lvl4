// @ts-check

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import _ from 'lodash';
import constants from '../../constants.js';
import { changeLanguage, currentLanguageSelector } from '../../slices/appSlice.js';

const getCurrentLocaleName = (locales, current) => _.find(locales, ['id', current]).name;

const LanguageSelector = () => {
  const { LOCALES } = constants;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLang = useSelector(currentLanguageSelector);

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang]);

  const handleLangSelect = (eventKey) => {
    dispatch(changeLanguage({ lang: eventKey }));
  };

  return (
    <DropdownButton
      className="mr-2"
      variant="secondary"
      title={getCurrentLocaleName(LOCALES, currentLang)}
      renderMenuOnMount
    >
      <Dropdown.Header>{t('lang.description')}</Dropdown.Header>
      {LOCALES.map(({ id, name }) => (
        <Dropdown.Item
          key={id}
          as="button"
          eventKey={id}
          onSelect={handleLangSelect}
          active={currentLang === id}
        >
          {name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default LanguageSelector;
