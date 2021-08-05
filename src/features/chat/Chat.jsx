// @ts-check

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { GoPlus } from 'react-icons/go';
import { Scrollbars } from 'react-custom-scrollbars';
import { setInitialState, setCurrentChannel } from './channelsSlice.js';
import NewMessageForm from './NewMessageForm.jsx';
import {
  openModal,
  newChannelModal,
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

const Messages = () => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channels);
  const { byId, allIds, status } = useSelector((state) => state.messages);

  if (status === 'pending') {
    return <div>{t('messages.loading')}</div>;
  }

  if (status === 'failed') {
    return <div>{t('messages.errors.load')}</div>;
  }

  const filteredMessages = allIds
    .map((id) => byId[id])
    .filter(({ channelId }) => channelId === currentChannelId);

  if (filteredMessages.length === 0) {
    return <div>{t('messages.noMessages')}</div>;
  }

  return (
    <ul className="list-unstyled text-break">
      {filteredMessages.map(({ id, username, body }) => (
        <li key={id}>
          <b>{`${username}: `}</b>
          {body}
        </li>
      ))}
    </ul>
  );
};

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  const handleNewChannel = () => {
    dispatch(openModal({ type: newChannelModal() }));
  };

  return (
    <Container fluid className="h-100 px-0">
      <Row className="h-100 m-0">
        <Col xs lg="2" className="p-3 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0 mr-2">{t('channels.title')}</h5>
            <Button
              variant="outline-primary"
              size="sm"
              type="button"
              title={t('channels.newChannel')}
              onClick={handleNewChannel}
            >
              <GoPlus />
              <span className="sr-only">{t('channels.newChannel')}</span>
            </Button>
          </div>
          <Scrollbars style={{ height: 'calc(100% - 40px)' }}>
            <Channels />
          </Scrollbars>
        </Col>
        <Col className="d-flex flex-column h-100 p-3">
          <Scrollbars>
            <Messages />
          </Scrollbars>
          <NewMessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
