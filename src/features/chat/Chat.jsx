// @ts-check

import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialState } from './channelsSlice.js';
import NewMessageForm from './NewMessageForm.jsx';

const Channels = () => {
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

  return (
    <Nav className="flex-column" variant="pills" activeKey={currentChannelId}>
      {allIds.map((id) => (
        <Nav.Item key={id}>
          <Nav.Link eventKey={id} href={`#${id}`}>
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

  if (allIds.length === 0) {
    return <div>No messages in this channel</div>;
  }

  const filteredMessages = allIds
    .map((id) => byId[id])
    .filter(({ channelId }) => channelId === currentChannelId);

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

  return (
    <Container fluid className="h-100 px-0">
      <Row className="h-100 m-0">
        <Col xs lg="2" className="p-3 bg-light">
          <h6>Channels</h6>
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
