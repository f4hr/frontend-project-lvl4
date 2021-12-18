// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Modal,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks/index.jsx';
import { channelsSelectors } from '../../slices/channelsSlice';

const RemoveChannelModal = ({ closeModal, channelId }) => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectEntities);
  const { removeChannel } = useSocket();
  const name = (channels[channelId]) ? channels[channelId].name : '';

  const handleRemoveChannel = async (values) => removeChannel({ id: values.channelId })
    .then(() => {
      closeModal();
      toast.success(t('removeChannel.success'));
    })
    .catch(() => {
      toast.error(t('channels.errors.remove'));
    });

  return (
    <Formik
      onSubmit={handleRemoveChannel}
      initialValues={{ channelId }}
    >
      {({
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t('removeChannel.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t('removeChannel.description', { name })}
            <Form.Control
              type="hidden"
              name="channelId"
              value={values.channelId}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>{t('form.cancel')}</Button>
            <Button
              type="submit"
              variant="danger"
              disabled={isSubmitting}
            >
              {(isSubmitting)
                ? (
                  <Spinner
                    className="mr-2"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )
                : null}
              {t('removeChannel.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

export default RemoveChannelModal;
