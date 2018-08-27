import React from "react";
import PropTypes from "prop-types";

import { isPromise } from "util/promise";

const FORM_ERROR = "%%FORM_ERROR%%";
const FormContext = React.createContext();

class FormProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      errors: {},
      validators: {},
      pristine: {},
      submitting: false,
      submitFormError: "",
      submitErrors: {}
    };

    this.registerField = this.registerField.bind(this);
    this.unregisterField = this.unregisterField.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.makeFieldDirty = this.makeFieldDirty.bind(this);
    this.isAbleToSubmit = this.isAbleToSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.packRenderProps = this.packRenderProps.bind(this);
  }

  registerField(fieldName, validator) {
    this.setState(
      state => ({
        validators: {
          ...state.validators,
          [fieldName]: validator || (() => undefined)
        },
        pristine: { ...state.pristine, [fieldName]: true }
      }),
      () => this.updateValue(fieldName, "")
    );
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
        [fieldName]: state.validators[fieldName](value)
      }
    }));
  }

  makeFieldDirty(fieldName) {
    this.setState(state => ({
      pristine: { ...state.pristine, [fieldName]: false }
    }));
  }

  packContextValue() {
    return {
      formState: this.state,
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      updateValue: this.updateValue,
      makeFieldDirty: this.makeFieldDirty
    };
  }

  isAbleToSubmit() {
    const { values, errors, validators } = this.state;
    const fields = Object.keys(values)

    const newErrors = fields.reduce((errors, field) =>
      ({ ...errors, [field]: validators[field](values[field])}),
      {}
    )

    this.setState({ errors: newErrors })

    return Object.keys(newErrors).reduce(
      (isAble, field) => !isAble || !newErrors[field],
      true
    );
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.isAbleToSubmit()) {
      return;
    }

    this.setState({ submitting: true });
    const res = this.props.onSubmit(this.state.values);

    if (isPromise(res)) {
      res
        .then(() => this.setState({ submitting: false }))
        .catch(err =>
          this.setState({ submitting: false, submitFormError: err })
        );

      return;
    }

    this.setState({
      submitting: false,
      submitFormError: (res && res[FORM_ERROR]) || ""
    });

    return;
  }

  packRenderProps() {
    const { submitting, submitFormError } = this.state;

    return {
      submitting,
      submitFormError
    };
  }

  render() {
    return (
      <FormContext.Provider value={this.packContextValue()}>
        <form onSubmit={this.onSubmit}>
          {this.props.children(this.packRenderProps())}
        </form>
      </FormContext.Provider>
    );
  }
}

FormProvider.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

export default FormProvider;
export const FormConsumer = FormContext.Consumer;
