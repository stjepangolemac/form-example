import React from "react";
import styled from "styled-components";

import Form, { FORM_ERROR } from "func/Form";
import Field from "func/Field";
import FormPage from "func/FormPage";

import AppContainer from "pres/AppContainer";
import TextInput from "pres/TextInput";
import CheckboxInput from "pres/CheckboxInput";
import Button from "pres/Button";
import Center from "pres/Center";
import Loader from "pres/Loader";

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
`;

const FormContainer = styled.div`
  width: 250px;
`;

const onSubmit = values => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email === "foo@bar.baz") {
        reject({
          email: "That email is already taken",
          [FORM_ERROR]: "There were some errors, please check fields"
        });
        return;
      }

      if (values.role === "fail please") {
        reject({
          role: "You knew this was going to happen?",
          [FORM_ERROR]: "There were some errors, please check fields"
        });
        return;
      }

      console.log(values);
      resolve();
    }, 2000);
  });
};

const App = () => (
  <AppContainer>
    <FormContainer>
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
              <div>
                {submitting && (
                  <Center>
                    <Loader />
                  </Center>
                )}
                {submitFailed &&
                  submitFormError && <Red>{submitFormError}</Red>}
                <Button full primary disabled={submitting}>
                  Submit
                </Button>
              </div>
            </FormPage>
          </React.Fragment>
        )}
      </Form>
    </FormContainer>
  </AppContainer>
);

export default App;
