import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Error = styled.p`
  color: red;
  font-size: 0.75em;
`;

const CheckboxInput = ({
  label,
  input,
  meta: { pristine, error, submitError }
}) => (
  <React.Fragment>
    <input {...input} type="checkbox" />
    <label htmlFor={input.id}>{label}</label>
    <Error>{!pristine && error || submitError}</Error>
  </React.Fragment>
);

CheckboxInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
    pristine: PropTypes.bool
  }),
  label: PropTypes.string
};

CheckboxInput.defaultProps = {
  input: {},
  meta: {},
}

export default CheckboxInput;
