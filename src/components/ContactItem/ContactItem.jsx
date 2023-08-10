import React from 'react';
import PropTypes from 'prop-types';
// import ContactItem from 'components/ContactItem';
import style from './ContactItem.module.css';

const ContactItem = ({id,name,number, onDeleteContact }) => {
    return (
      <li  className={style.contact_item}>
        {name}: {number}
        <button type="button" onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </li>
    );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactItem;