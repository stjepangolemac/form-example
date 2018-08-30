import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 10px 5px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 100%;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75em;
`;

const Red = styled.span`
  color: red;
`;

const TextInput = ({
  label,
  type,
  input,
  meta: { pristine, error, submitError }
}) => (
  <InputContainer>
    <label htmlFor={input.id}>
      {label}: <Red>*</Red>
    </label>
    <br />
    <Input {...input} type={type || "text"} />
    <Error>{(!pristine && error) || submitError}</Error>
  </InputContainer>
);

TextInput.displayName = "TextInput";

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
  meta: {}
};

export default TextInput;
