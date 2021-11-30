// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { GoPlus } from 'react-icons/go';
import { setInitialState } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import NewMessageForm from './NewMessageForm.jsx';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const { byId, status } = useSelector((state) => state.messages);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  useEffect(() => {
    scrollbarRef.current.scrollToBottom();
  }, [currentChannelId, byId, status]);

  const handleNewChannel = () => {
    dispatch(openModal({ type: 'new' }));
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
              title="+"
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
          <Scrollbars ref={scrollbarRef}>
            <Messages />
          </Scrollbars>
          <NewMessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
