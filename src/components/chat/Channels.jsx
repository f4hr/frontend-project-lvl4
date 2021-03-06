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
import {
  actions as channelActions,
  channelsSelectors,
  currentChannelSelector,
} from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(currentChannelSelector);
  const channels = useSelector(channelsSelectors.selectAll);

  const handleChannelChange = (channelId) => () => {
    dispatch(channelActions.setCurrentChannel(channelId));
  };

  const handleRemoveChannel = (id) => (e) => {
    e.preventDefault();
    const data = {
      type: 'remove',
      meta: {
        channelId: id,
      },
    };
    dispatch(openModal(data));
  };

  const handleRenameChannel = (id) => (e) => {
    e.preventDefault();
    const data = {
      type: 'rename',
      meta: {
        channelId: id,
      },
    };
    dispatch(openModal(data));
  };

  return (
    <Nav className="flex-column pr-1" variant="pills" activeKey={currentChannelId}>
      {channels.map(({ id, name, removable }) => (
        <Nav.Item key={id} className="w-100">
          <Dropdown className="w-100" as={ButtonGroup}>
            <Button
              className="w-100 text-left text-truncate"
              variant={(currentChannelId === id) ? 'primary' : 'link'}
              type="button"
              onClick={handleChannelChange(id)}
            >
              {name}
            </Button>
            {(removable)
              ? (
                <>
                  <Dropdown.Toggle
                    split
                    variant={(currentChannelId === id) ? 'primary' : 'link'}
                    aria-label={t('channels.edit')}
                  />
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
