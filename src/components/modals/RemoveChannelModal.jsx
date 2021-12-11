// @ts-check

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks/index.jsx';
import { channelsSelectors } from '../../slices/channelsSlice';

const RemoveChannelModal = ({ closeModal, channelId }) => {
  const { t } = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const channels = useSelector(channelsSelectors.selectEntities);
  const { removeChannel } = useSocket();
  const name = (channels[channelId]) ? channels[channelId].name : '';

  const handleRemoveChannel = async () => {
    try {
      setSubmitting(true);
      await removeChannel({ id: channelId });
      setSubmitting(false);
      closeModal();
      toast.success(t('removeChannel.success'));
    } catch (err) {
      setSubmitting(false);
      closeModal();
      toast.error(t('channels.errors.remove'));
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('removeChannel.description', { name })}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>{t('form.cancel')}</Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isSubmitting}
          onClick={handleRemoveChannel}
        >
          {t('removeChannel.submit')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannelModal;
