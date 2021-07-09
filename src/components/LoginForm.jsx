// @ts-check

import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

const TextInput = (props) => {
  const {
    id,
    label,
    name,
    type,
    placeholder,
  } = props;
  const [field, meta] = useField(name);
  const { value, onChange, onBlur } = field;
  const isValid = meta.touched && meta.error;
  const className = cn({
    'form-control': true,
    'is-invalid': isValid,
  });
  return (
    <div className="form-floating mb-3">
      <input
        id={id || name}
        className={className}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id || name}>{label}</label>
      {isValid ? <div className="invalid-feedback">{meta.error}</div> : null}
    </div>
  );
};

// And now we can use these
const SignupForm = () => {
  const initialValues = {
    username: '',
    password: '',
  };
  const schema = Yup.object({
    username: Yup.string()
      .min(1, 'Количество символов должно быть не меньше 1')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(8, 'Количество символов должно быть не меньше 8')
      .required('Обязательное поле'),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className="row g-3">
        <div className="col-md-4">
          <TextInput
            label="Ваш ник"
            name="username"
            type="text"
            placeholder="Ваш ник"
          />
        </div>
        <div className="col-md-4">
          <TextInput
            label="Пароль"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Войти</button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignupForm;
