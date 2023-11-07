import React, { Component } from 'react';
import { ContactForm } from "./form/ContactForm.jsx";
import { Filter } from "./filter/Filter.jsx";
import { ContactList } from "./list/ContactList.jsx";

import { nanoid } from 'nanoid';

import PropTypes from 'prop-types';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

//jako pierwszą rzecz odczytujemy kontakty z localStorage i aktualizujemy stan komponentu.
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }
//reagujemy na zmianę stanu `contacts` i zapisujemy kontakty w localStorage
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
/* każde dodanie lub usunięcie kontaktu będzie również aktualizować dane w localStorage. 
Podczas ładowania aplikacji, kontakty zostaną pobrane z localStorage i załadowane do stanu komponentu.
 */

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
        <ContactForm 
        onAddContact={this.handleAddContact} 
        />

        <h2>Contacts</h2>
        <Filter 
        filter={filter} 
        onFilterChange={this.handleFilterChange} 
        />

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
