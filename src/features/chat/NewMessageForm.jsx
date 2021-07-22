// @ts-check

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

const NewMessageForm = () => {
  const [formState] = useState('filling');

  const handleMessageSend = (values) => {
    console.log(values);
  };

  return (
    <Formik
      onSubmit={handleMessageSend}
      initialValues={{
        message: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
      }) => (
        <Form className="d-flex" noValidate onSubmit={handleSubmit}>
          <Form.Group className="flex-grow-1 mb-0 mr-3" controlId="username">
            <Form.Control
              type="text"
              name="message"
              value={values.message}
              placeholder="Enter message..."
              onChange={handleChange}
              readOnly={formState === 'processing'}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={values.message === '' || formState === 'processing'}
          >
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
