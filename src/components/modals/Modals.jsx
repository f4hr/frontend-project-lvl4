// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../../slices/modalsSlice.js';
import NewChannelModal from './NewChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const MODAL_TYPES_DATA = {
  new: {
    modalTitle: 'newChannel.title',
    label: 'newChannel.label',
    submitButtonText: 'form.submit',
    success: 'newChannel.success',
    error: 'channels.errors.new',
  },
  rename: {
    modalTitle: 'renameChannel.title',
    label: 'renameChannel.label',
    submitButtonText: 'renameChannel.submit',
    success: 'renameChannel.success',
    error: 'channels.errors.rename',
  },
};

const Modals = () => {
  const dispatch = useDispatch();
  const { isOpened, type, meta } = useSelector((state) => state.modals);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const getModal = (modalType) => {
    switch (modalType) {
      case 'new':
        return (
          <NewChannelModal
            closeModal={handleClose}
            modalData={MODAL_TYPES_DATA[modalType]}
          />
        );
      case 'rename':
        return (
          <RenameChannelModal
            closeModal={handleClose}
            modalData={MODAL_TYPES_DATA[modalType]}
            channelId={meta.channelId}
          />
        );
      case 'remove':
        return (
          <RemoveChannelModal
            closeModal={handleClose}
            channelId={meta.channelId}
          />
        );
      default:
        throw new Error(`Unknown modal type "${modalType}"`);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      {type && getModal(type)}
    </Modal>
  );
};

export default Modals;
