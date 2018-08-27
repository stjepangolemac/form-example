import React from "react";

const FormContext = React.createContext();

class FormProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      errors: {},
      validators: {},
      pristine: {},
    };

    this.registerField = this.registerField.bind(this);
    this.unregisterField = this.unregisterField.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.makeFieldDirty = this.makeFieldDirty.bind(this);
  }

  registerField(fieldName, validator) {
    this.setState(state => ({
      validators: { ...state.validators, [fieldName]: validator },
      pristine: { ...state.pristine, [fieldName]: true }
    }), () => this.updateValue(fieldName, ''));
  }

  unregisterField(fieldName) {
    this.setState(state => ({
      validators: { ...state.validators, [fieldName]: undefined }
    }));
  }

  updateValue(fieldName, value) {
    this.setState(state => ({
      values: { ...state.values, [fieldName]: value },
      errors: {
        ...state.errors,
        [fieldName]:
          state.validators[fieldName] && state.validators[fieldName](value)
      }
    }));
  }

  makeFieldDirty(fieldName) {
    this.setState(state => ({
      pristine: { ...state.pristine, [fieldName]: false }
    }))
  }

  packContextValue() {
    return {
      formState: this.state,
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      updateValue: this.updateValue,
      makeFieldDirty: this.makeFieldDirty,
    };
  }

  render() {
    return (
      <FormContext.Provider value={this.packContextValue()}>
        {this.props.children}
      </FormContext.Provider>
    );
  }
}

export default FormProvider;
export const FormConsumer = FormContext.Consumer;
