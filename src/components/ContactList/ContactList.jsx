import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem';
import style from './ContactList.module.css';


 const ContactList = ({
  contactList,
  onDeleteContact,
}) => {
  return (
    <ul className={style.list_contacts}>
      {contactList.map(({ name, number, id }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;