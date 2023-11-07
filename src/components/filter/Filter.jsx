import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../App.module.css';

export class Filter extends Component {
  handleChange = event => {
    this.props.onFilterChange(event.target.value);
  };

  render() {
    return (
      <div className={css.form__container}>
        <label htmlFor="filter">Find contacts by name</label>
        <input
          type="text"
          value={this.props.filter}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};