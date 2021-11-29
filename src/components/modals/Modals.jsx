// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from './modalsSlice.js';
import NewChannelModal from './NewChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const MODAL_TYPES_DATA = {
  new: {
    modalTitle: 'newChannel.title',
    inputTestId: 'add-channel',
    label: 'newChannel.label',
    submitButtonText: 'form.submit',
  },
  rename: {
    modalTitle: 'renameChannel.title',
    inputTestId: 'rename-channel',
    label: 'renameChannel.label',
    submitButtonText: 'renameChannel.submit',
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
            handleClose={handleClose}
            modalData={MODAL_TYPES_DATA[modalType]}
          />
        );
      case 'rename':
        return (
          <RenameChannelModal
            handleClose={handleClose}
            modalData={MODAL_TYPES_DATA[modalType]}
            channelId={meta.channelId}
          />
        );
      case 'remove':
        return (
          <RemoveChannelModal
            handleClose={handleClose}
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
