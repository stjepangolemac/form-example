import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ label, input, meta: { pristine, error } }) => (
  <React.Fragment>
    <label htmlFor={input.id}>{label}</label>
    <input {...input} type="text" />
    <p>{!pristine && error}</p>
  </React.Fragment>
);

TextInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    pristine: PropTypes.bool,
  }),
  label: PropTypes.string,
};

export default TextInput;
