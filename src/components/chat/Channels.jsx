// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { setCurrentChannel } from './channelsSlice.js';
import {
  openModal,
  removeChannelModal,
  renameChannelModal,
} from '../modals/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    byId,
    allIds,
    currentChannelId,
    status,
  } = useSelector((state) => state.channels);

  if (status === 'loading') {
    return <div>{t('channels.loading')}</div>;
  }

  if (status === 'failed') {
    return <div>{t('channels.error.load')}</div>;
  }

  const handleChannelChange = (channelId) => () => {
    dispatch(setCurrentChannel(channelId));
  };

  const handleRemoveChannel = (id) => (e) => {
    e.preventDefault();
    const data = {
      type: removeChannelModal(),
      meta: {
        channelId: id,
      },
    };
    dispatch(openModal(data));
  };

  const handleRenameChannel = (id) => (e) => {
    e.preventDefault();
    const data = {
      type: renameChannelModal(),
      meta: {
        channelId: id,
      },
    };
    dispatch(openModal(data));
  };

  return (
    <Nav className="flex-column pr-1" variant="pills" activeKey={currentChannelId}>
      {allIds.map((id) => (
        <Nav.Item key={id} className="w-100">
          <Dropdown className="w-100" as={ButtonGroup}>
            <Button
              className="w-100 text-left text-truncate"
              variant={(currentChannelId === id) ? 'primary' : 'link'}
              type="button"
              onClick={handleChannelChange(id)}
            >
              {byId[id].name}
            </Button>
            {(byId[id].removable)
              ? (
                <>
                  <Dropdown.Toggle split variant={(currentChannelId === id) ? 'primary' : 'link'} />
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={handleRemoveChannel(id)}>{t('channels.removeChannel')}</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleRenameChannel(id)}>{t('channels.renameChannel')}</Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )
              : null}
          </Dropdown>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Channels;