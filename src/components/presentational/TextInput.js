import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Error = styled.p`
  color: red;
  font-size: 0.75em;
`;

const TextInput = ({ label, type, input, meta: { pristine, error } }) => (
  <React.Fragment>
    <label htmlFor={input.id}>{label}:</label>
    <input {...input} type={type || "text"} />
    <Error>{!pristine && error}</Error>
  </React.Fragment>
);

TextInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    pristine: PropTypes.bool
  }),
  label: PropTypes.string,
  type: PropTypes.string
};

export default TextInput;
