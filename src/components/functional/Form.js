import React from "react";
import PropTypes from "prop-types";

import { isPromise } from "util/promise";

const FormContext = React.createContext();
export const FormConsumer = FormContext.Consumer;
export const FORM_ERROR = "%%FORM_ERROR%%";

class FormProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      errors: {},
      validators: {},
      pristine: {},
      submitting: false,
      submitFailed: false,
      submitFormError: "",
      submitErrors: {},
      currentPage: props.pages ? props.pages[0] : ""
    };

    this.registerField = this.registerField.bind(this);
    this.unregisterField = this.unregisterField.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.makeFieldDirty = this.makeFieldDirty.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.packRenderProps = this.packRenderProps.bind(this);
    this.packSubmitErrors = this.packSubmitErrors.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  registerField(fieldName, validator, initialValue = "") {
    this.setState(
      state => ({
        validators: {
          ...state.validators,
          [fieldName]: validator
        },
        pristine: { ...state.pristine, [fieldName]: true }
      }),
      () =>
        this.updateValue(
          fieldName,
          this.state.values[fieldName] || initialValue
        )
    );
  }

  unregisterField(fieldName) {
    this.setState(state => ({
      validators: { ...state.validators, [fieldName]: undefined }
    }));
  }

  updateValue(fieldName, value) {
    this.setState(state => {
      return {
        values: { ...state.values, [fieldName]: value },
        errors: {
          ...state.errors,
          [fieldName]: state.validators[fieldName]
            ? state.validators[fieldName](value)
            : undefined
        }
      };
    });
  }

  makeFieldDirty(fieldName) {
    this.setState(state => ({
      pristine: { ...state.pristine, [fieldName]: false }
    }));
  }

  previousPage() {
    const { currentPage } = this.state;
    const { pages } = this.props;

    if (this.isFormValid()) {
      if (currentPage === pages[0]) {
        return;
      }

      this.setState(({ currentPage }) => {
        const previousPage = currentPage
          ? pages[pages.findIndex(page => page === currentPage) - 1]
          : pages[0];

        return { currentPage: previousPage };
      });
    }
  }

  nextPage() {
    const { currentPage } = this.state;
    const { pages } = this.props;

    if (this.isFormValid()) {
      if (currentPage === pages[pages.length]) {
        return;
      }

      this.setState(({ currentPage }) => {
        const nextPage = currentPage
          ? pages[pages.findIndex(page => page === currentPage) + 1]
          : pages[0];

        return { currentPage: nextPage };
      });
    }
  }

  packContextValue() {
    return {
      formState: this.state,
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      updateValue: this.updateValue,
      makeFieldDirty: this.makeFieldDirty,
      previousPage: this.previousPage,
      nextPage: this.nextPage
    };
  }

  isFormValid() {
    const { values, validators } = this.state;

    const errors = Object.keys(validators)
      .filter(field => validators[field])
      .reduce(
        (errors, field) => ({
          ...errors,
          [field]: validators[field]
            ? validators[field](values[field])
            : undefined
        }),
        {}
      );

    const fieldsWithErrors = Object.keys(errors).filter(field => errors[field]);

    this.setState(state => ({
      errors,
      pristine: {
        ...Object.keys(state.pristine).reduce(
          (acc, field) => ({ ...acc, [field]: false }),
          {}
        )
      }
    }));

    return !fieldsWithErrors.length;
  }

  packSubmitErrors(errors) {
    if (!errors || !Object.keys(errors).length) {
      return {
        submitErrors: {},
        submitFormError: ""
      };
    }

    return {
      submitErrors: { ...errors, [FORM_ERROR]: undefined },
      submitFormError: errors[FORM_ERROR]
    };
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    this.setState({ submitting: true });
    const res = this.props.onSubmit(this.state.values);

    if (isPromise(res)) {
      res
        .then(() => this.setState({ submitting: false, submitFailed: false }))
        .catch(err =>
          this.setState({
            submitting: false,
            submitFailed: true,
            ...this.packSubmitErrors(err)
          })
        );

      return;
    }

    const isError = !!res && !!Object.keys(res).length;
    this.setState({
      submitting: false,
      submitFailed: isError,
      ...this.packSubmitErrors(res)
    });

    return;
  }

  packRenderProps() {
    const { submitting, submitFormError, currentPage } = this.state;

    return {
      submitting,
      submitFormError,
      currentPage
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
  children: PropTypes.func.isRequired,

  pages: PropTypes.arrayOf(PropTypes.string)
};

export default FormProvider;
