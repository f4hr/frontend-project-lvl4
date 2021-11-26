// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { removeChannelRequest } from '../chat/channelsSlice.js';

const RemoveChannelModal = ({ handleClose, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { byId, status } = useSelector((state) => state.channels);
  const name = (byId[channelId]) ? byId[channelId].name : '';

  const handleRemoveChannel = () => {
    dispatch(removeChannelRequest(channelId));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('removeChannelModal.description', { name })}</Modal.Body>
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
    </>
  );
};

export default RemoveChannelModal;
