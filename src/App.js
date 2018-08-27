import React from "react";

import Form, { FORM_ERROR } from "func/Form";
import Field from "func/Field";
import FormPage from "func/FormPage";

import AppContainer from "pres/AppContainer";
import TextInput from "pres/TextInput";
import CheckboxInput from "pres/CheckboxInput";

import { isEmpty } from "util/validators";

const onSubmit = values => {
  console.log(values);

  // return { [FORM_ERROR]: "false alarm" };
  return {};
};

const App = () => (
  <AppContainer>
    <Form onSubmit={onSubmit} pages={["user", "privacy", "done"]}>
      {({ submitting, submitFormError }) => (
        <React.Fragment>
          <FormPage page="user">
            <Field
              name="name"
              component={TextInput}
              label="Name"
              validator={isEmpty}
            />
            <Field
              name="role"
              component={TextInput}
              label="Role"
              validator={isEmpty}
            />
            <Field
              name="email"
              component={TextInput}
              label="Email"
              validator={isEmpty}
              type="email"
            />
            <Field
              name="password"
              component={TextInput}
              label="Password"
              validator={isEmpty}
              type="password"
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
            <button>Submit</button>
          </FormPage>
          {submitting && "...loading"}
          {submitFormError && <p>{submitFormError}</p>}
        </React.Fragment>
      )}
    </Form>
  </AppContainer>
);

export default App;
