// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars';
import { GoPlus } from 'react-icons/go';
import { setInitialState } from '../../slices/appSlice.js';
import { openModal } from '../../slices/modalsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import NewMessageForm from './NewMessageForm.jsx';
import { useAuth } from '../../hooks/index.jsx';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [state, setState] = useState('idle');
  const { logOut } = useAuth();
  const scrollbarRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        setState('pending');
        await dispatch(setInitialState()).unwrap();
        setState('success');
      } catch (err) {
        setState('failed');
        logOut();
        toast.error(t(err.message));
      }
    })();

    return () => {
      setState('idle');
    };
  }, []);

  const handleNewChannel = () => {
    dispatch(openModal({ type: 'new' }));
  };

  const renderSpinner = () => (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border" variant="primary" role="status">
        <span className="sr-only">{t('states.loading')}</span>
      </Spinner>
    </div>
  );

  return (
    <Container fluid className="h-100 px-0">
      <Row className="h-100 m-0">
        <Col xs lg="2" className="p-3 bg-light">
          {(state === 'pending')
            ? (renderSpinner())
            : (
              <>
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
              </>
            )}
        </Col>
        <Col className="d-flex flex-column h-100 p-3">
          {(state === 'pending')
            ? (renderSpinner())
            : (
              <>
                <Scrollbars ref={scrollbarRef}>
                  <Messages scrollbar={scrollbarRef} />
                </Scrollbars>
                <NewMessageForm />
              </>
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
