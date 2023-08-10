import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './ContactForm.module.css';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const contactNameRegExp =
  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(contactNameRegExp, 'Contact name  is not valid')
    .required('Contact name   is require'),

  // number: Yup.number()
  //   .typeError("That doesn't look like a phone number")
  //   .positive("A phone number can't start with a minus")
  //   .integer("A phone number can't include a decimal point")
  //   .min(8)
  //   .required('A phone number is required'),

  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('A phone number is required'),
});



const ContactForm =({onSubmit})=> {
  // state = {
  //   name: '',
  //   number: '',
  // };

  // handleChange = e => {
  //   const { name, value } = e.currentTarget;
  //   this.setState({ [name]: value });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.onSubmit(this.state);
  //   this.setState({ name: '', number: '' });
  //   // e.currentTarget.reset();
  // };

  // render() {
  const initialValues = {
    name: '',
    number: '',
  };
    const nameImputId = nanoid();
    const tellNumberImputId = nanoid();
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(value, { resetForm }) => {
          onSubmit(value);
          resetForm();
        }}
      >
        { 
          <Form className={style.form}>
            <label htmlFor={nameImputId}>Name</label>
            <Field id={nameImputId} name="name" type="text" />
            <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
            <label htmlFor={tellNumberImputId}>Namber</label>
            <Field id={tellNumberImputId} name="number" type="tel" />
            <ErrorMessage name="number">{msg => <div>{msg}</div>}</ErrorMessage>
            <button type="submit">Add contact</button>
          </Form>
        }
      </Formik>
    );
  // }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
