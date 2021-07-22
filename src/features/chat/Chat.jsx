// @ts-check

import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChat } from './chatSlice.js';
import NewMessageForm from './NewMessageForm.jsx';

const Channels = ({ channels, currentChannelId }) => (
  <Nav className="flex-column" variant="pills" activeKey={currentChannelId}>
    {channels.map(({ id, name }) => (
      <Nav.Item key={id}>
        <Nav.Link eventKey={id} href={`#${id}`}>
          {name}
        </Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
);

const Messages = ({ messages }) => (
  <ul>
    {messages.map(({ id, user, message }) => <li key={id}>{`<b>${user}</b>: ${message}`}</li>)}
  </ul>
);

const Chat = () => {
  const { channels, messages, currentChannelId } = useSelector((state) => state.chat);
  const chatStatus = useSelector((state) => state.chat.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatStatus === 'idle') {
      dispatch(fetchChat());
    }
  }, [chatStatus, dispatch]);

  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <Container fluid className="h-100 px-0">
      <Row className="h-100 m-0">
        <Col xs lg="2" className="p-3 bg-light">
          <h6>Channels</h6>
          <Channels
            channels={channels}
            currentChannelId={currentChannelId}
          />
        </Col>
        <Col className="d-flex flex-column h-100 p-3">
          <div className="flex-grow-1">
            {(messages.length === 0)
              ? <p>Chat is empty...</p>
              : <Messages messages={filteredMessages} />}
          </div>
          <NewMessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
