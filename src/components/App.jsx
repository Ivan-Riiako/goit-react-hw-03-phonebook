import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import style from './App.module.css';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = formState => {
    const { name, number } = formState;
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacrs`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, number, id: nanoid() }],
    }));
  };

  handleChangeFindInput = value => {
    this.setState({ filter: value });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  makeContactList = () => {
    const { contacts, filter } = this.state;
    const filterNormalize = filter.toLowerCase();

    if (filter === '') {
      return contacts;
    }
    const findNewArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
    return findNewArray;

  }

  render() {
     const { filter } = this.state;
    const {
      handleSubmit,
      handleChangeFindInput,
      handleDeleteContact,
      makeContactList,
    } = this;
    const contacts =makeContactList();

    return (
      <div className={style.section}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} />

        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter
          onFindInput={handleChangeFindInput}
          inputValueSeach={filter}
        />
        <ContactList
          contactList={contacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  }
}


export default App;