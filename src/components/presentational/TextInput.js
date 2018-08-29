import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Error = styled.p`
  color: red;
  font-size: 0.75em;
`;

const Red = styled.span`
  color: red;
`

const TextInput = ({
  label,
  type,
  input,
  meta: { pristine, error, submitError }
}) => (
  <React.Fragment>
    <label htmlFor={input.id}>{label}: <Red>*</Red></label>
    <br />
    <input {...input} type={type || "text"} />
    <Error>{(!pristine && error) || submitError}</Error>
  </React.Fragment>
);

TextInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
    pristine: PropTypes.bool
  }),
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool
};

TextInput.defaultProps = {
  input: {},
  meta: {},
}

export default TextInput;
