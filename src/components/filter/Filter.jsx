import React from 'react';
import PropTypes from 'prop-types';
import css from '../App.module.css';

export const Filter = ({filter, onFilterChange}) => {
  const handleChange = event => {
    onFilterChange(event.target.value);
  };

    return (
      <div className={css.form__container}>
        <label htmlFor="filter">Find contacts by name</label>
        <input
          type="text"
          value={filter}
          onChange={handleChange}
        />
      </div>
    );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};