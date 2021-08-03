// @ts-check

import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  Button,
} from 'react-bootstrap';
import { GoPlus } from 'react-icons/go';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialState, setCurrentChannel } from './channelsSlice.js';
import NewMessageForm from './NewMessageForm.jsx';
import { openModal, newChannelModal } from '../modals/modalsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const {
    byId,
    allIds,
    currentChannelId,
    status,
  } = useSelector((state) => state.channels);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load channels</div>;
  }

  const handleSelect = (channelId, e) => {
    e.preventDefault();
    dispatch(setCurrentChannel(channelId));
  };

  return (
    <Nav className="flex-column" variant="pills" activeKey={currentChannelId}>
      {allIds.map((id) => (
        <Nav.Item key={id}>
          <Nav.Link eventKey={id} href={`#${id}`} onSelect={handleSelect}>
            {byId[id].name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

const Messages = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { byId, allIds, status } = useSelector((state) => state.messages);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load messages</div>;
  }

  const filteredMessages = allIds
    .map((id) => byId[id])
    .filter(({ channelId }) => channelId === currentChannelId);

  if (filteredMessages.length === 0) {
    return <div>No messages in this channel</div>;
  }

  return (
    <ul className="list-unstyled">
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  const handleNewChannel = () => {
    dispatch(openModal(newChannelModal()));
  };

  return (
    <Container fluid className="h-100 px-0">
      <Row className="h-100 m-0">
        <Col xs lg="2" className="p-3 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0 mr-2">Channels</h5>
            <Button
              variant="outline-primary"
              size="sm"
              type="button"
              title="Add new channel"
              onClick={handleNewChannel}
            >
              <GoPlus />
              <span className="sr-only">Add new channel</span>
            </Button>
          </div>
          <Channels />
        </Col>
        <Col className="d-flex flex-column h-100 p-3">
          <div className="chat__messages-wrapper flex-grow-1">
            <Messages />
          </div>
          <NewMessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
