// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { removeChannelRequest } from '../chat/channelsSlice.js';
import { removeChannelModal, closeModal } from './modalsSlice.js';

const NewChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpened, type, meta } = useSelector((state) => state.modals);
  const { byId, status } = useSelector((state) => state.channels);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemoveChannel = () => {
    dispatch(removeChannelRequest(meta.channelId));
  };

  if (type === removeChannelModal()) {
    const name = (byId[meta.channelId]) ? byId[meta.channelId].name : '';
    return (
      <Modal show={isOpened} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('removeChannelModal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{(isOpened) ? t('removeChannelModal.description', { name }) : null}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('form.cancel')}</Button>
          <Button
            type="submit"
            variant="danger"
            disabled={status === 'pending'}
            onClick={handleRemoveChannel}
          >
            {t('removeChannelForm.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return null;
};

export default NewChannelModal;
