import React from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

const Filter = ({ onFindInput ,inputValueSeach}) => {

  const handleChange = e => {
    const { value } = e.currentTarget;
    onFindInput(value);
  };

  return (
    <input
      value={inputValueSeach}
      name="filter"
      className={style.input_seach}
      onChange={handleChange}
    />
  );
};

Filter.propTypes = {
  onFindInput: PropTypes.func.isRequired,
  inputValueSeach:PropTypes.string.isRequired,
};

export default Filter;
