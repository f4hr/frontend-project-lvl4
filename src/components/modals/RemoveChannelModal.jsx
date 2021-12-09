// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useSocket } from '../../hooks/index.jsx';

const RemoveChannelModal = ({ handleClose, channelId }) => {
  const { t } = useTranslation();
  const { byId, status } = useSelector((state) => state.channels);
  const { removeChannel } = useSocket();
  const name = (byId[channelId]) ? byId[channelId].name : '';

  const handleRemoveChannel = () => {
    removeChannel({ id: channelId });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('removeChannel.description', { name })}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>{t('form.cancel')}</Button>
        <Button
          type="submit"
          variant="danger"
          disabled={status === 'pending'}
          onClick={handleRemoveChannel}
        >
          {t('removeChannel.submit')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannelModal;
