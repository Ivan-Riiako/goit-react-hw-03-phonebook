import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import style from './App.module.css';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import initialContacts from './contacts.json';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount(prevProps, prevState) {
    const todos = localStorage.getItem('contacts');
    const parseTodos= JSON.parse(todos)
    // console.log(this.state.contacts);
   
      this.setState({ contacts: parseTodos || initialContacts })
   
    
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    // console.log(this.state.contacts);
    // console.log(`refresh state`);

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
      // console.log(`comparison state`);
    }
  }
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
  };

  render() {
    const { filter } = this.state;
    const {
      handleSubmit,
      handleChangeFindInput,
      handleDeleteContact,
      makeContactList,
    } = this;
    const contacts = makeContactList();

    return (
      <div className={style.section}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} />

        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter onFindInput={handleChangeFindInput} inputValueSeach={filter} />
        <ContactList
          contactList={contacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
