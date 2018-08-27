import React from "react";
import styled from 'styled-components'

import Form, { FORM_ERROR } from "func/Form";
import Field from "func/Field";
import FormPage from "func/FormPage";

import AppContainer from "pres/AppContainer";
import TextInput from "pres/TextInput";
import CheckboxInput from "pres/CheckboxInput";

import {
  combineValidators,
  isEmpty,
  isEmail,
  makeMin,
  oneNum,
  oneLow,
  oneUpp
} from "util/validators";

const Red = styled.p`
  color: red;
`

const onSubmit = values => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(values);

      if (values.email === "foo@bar.baz") {
        reject({ email: "That email is already taken" });
        return;
      }

      if (values.role === "fail please") {
        reject({
          role: "You knew this was going to happen?",
          [FORM_ERROR]: "This is an error from the API, check fields"
        });
        return;
      }

      resolve();
      alert('Success, check console')
    }, 2000);
  });
};

const App = () => (
  <AppContainer>
    <Form onSubmit={onSubmit} pages={["user", "privacy", "done"]}>
      {({ submitting, submitFailed, submitFormError }) => (
        <React.Fragment>
          <FormPage page="user">
            <Field
              name="name"
              component={TextInput}
              label="Name"
              validator={isEmpty}
              required
            />
            <Field name="role" component={TextInput} label="Role" />
            <Field
              name="email"
              component={TextInput}
              label="Email"
              validator={combineValidators(isEmpty, isEmail)}
              type="email"
              required
            />
            <Field
              name="password"
              component={TextInput}
              label="Password"
              validator={combineValidators(
                isEmpty,
                makeMin(9),
                oneNum,
                oneLow,
                oneUpp
              )}
              type="password"
              required
            />
          </FormPage>
          <FormPage page="privacy">
            <Field
              name="receiveUpdates"
              component={CheckboxInput}
              label="Receive updates about Tray.io products by email"
              type="checkbox"
            />
            <Field
              name="receiveMarketing"
              component={CheckboxInput}
              label="Receive communication by email for other products created by the Tray.io team"
              type="checkbox"
            />
          </FormPage>
          <FormPage page="done">
            <p>Thank you for your time, click submit</p>
            <button>Submit</button>
          </FormPage>
          {submitting && "...loading"}
          {submitFailed && <Red>submit failed</Red>}
          {submitFormError && <Red>{submitFormError}</Red>}
        </React.Fragment>
      )}
    </Form>
  </AppContainer>
);

export default App;
