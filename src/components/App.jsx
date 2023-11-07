import React, { Component } from 'react';
import { ContactForm } from "./form/ContactForm.jsx";
import { Filter } from "./filter/Filter.jsx";
import { ContactList } from "./list/ContactList.jsx";


import { nanoid } from 'nanoid';

import PropTypes from 'prop-types';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  };

  handleAddContact = newContact => {
    const { contacts } = this.state;
  
  // Sprawdź, czy istnieje kontakt o takiej samej nazwie
  const existingContact = contacts.find(contact =>
    contact.name.toLowerCase() === newContact.name.toLowerCase()
  );

  // Jeśli istnieje, pokaż alert z ostrzeżeniem
  if (existingContact) {
    alert(`${newContact.name} is already in contacts`);
    return;
  }

    const contactWithId = { ...newContact, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactWithId]
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.form__container}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={this.handleFilterChange} />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDelete}
        />
        
       
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  )
};
