import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../App.module.css';

export class ContactList extends Component {
  handleDelete = id => {
    this.props.onDeleteContact(id);
  };

  render() {
    return (
      <ul>
        {this.props.contacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button className={css.form__button_delete} onClick={() => this.handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired
};
