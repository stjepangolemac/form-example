import React from "react";

import Form from "func/Form";
import Field from "func/Field";

import AppContainer from "pres/AppContainer";
import TextInput from "pres/TextInput";

import { isEmpty } from 'util/validators'

const App = () => (
  <AppContainer>
    <Form>
      <Field
        name="foo"
        component={TextInput}
        label="First name"
        validator={isEmpty}
      />
    </Form>
  </AppContainer>
);

export default App;
