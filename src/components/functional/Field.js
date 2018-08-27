import React from "react";
import PropTypes from "prop-types";

import { FormConsumer } from "func/Form";

const FieldWrapper = props => (
  <FormConsumer>
    {context => <Field fieldProps={props} {...context} />}
  </FormConsumer>
);

class Field extends React.Component {
  componentDidMount() {
    const {
      registerField,
      fieldProps: { name, validator }
    } = this.props;

    registerField(name, validator);
  }

  componentWillUnmount() {
    const {
      unregisterField,
      fieldProps: { name }
    } = this.props;

    unregisterField(name);
  }

  packInputProps() {
    const {
      formState,
      updateValue,
      makeFieldDirty,
      fieldProps: { name }
    } = this.props;

    return {
      id: name,
      value: formState.values[name] || "",
      onChange: e => updateValue(name, e.target.value + ""),
      onBlur: () => makeFieldDirty(name)
    };
  }

  packMetaProps() {
    const {
      formState,
      fieldProps: { name }
    } = this.props;

    return {
      error: formState.errors[name],
      submitError: formState.submitErrors[name],
      pristine: formState.pristine[name]
    };
  }

  render() {
    const {
      fieldProps: { component: Component, name, validator, ...restFieldProps }
    } = this.props;

    if (!Component) {
      return null;
    }

    return (
      <Component
        {...restFieldProps}
        input={this.packInputProps()}
        meta={this.packMetaProps()}
      />
    );
  }
}

Field.propTypes = {
  registerField: PropTypes.func.isRequired,
  unregisterField: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  makeFieldDirty: PropTypes.func.isRequired,

  fieldProps: PropTypes.shape({
    component: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    validator: PropTypes.func
  })
};

export default FieldWrapper;
