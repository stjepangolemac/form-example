import React from "react";
import renderer from "react-test-renderer";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import AppContainer from "pres/AppContainer";
import CheckboxInput from "pres/CheckboxInput";
import TextInput from "pres/TextInput";

import Form from "func/Form";
import Field from "func/Field";
import FormPage from "func/FormPage";

const components = [[AppContainer, {}], [CheckboxInput, {}], [TextInput, {}]];

describe("components", () => {
  components.forEach(args => {
    test(`${args[0].displayName} component should match snapshot`, () => {
      const Component = args[0];
      const props = args[1];

      const tree = renderer.create(<Component {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("Form", () => {
  test("should match snapshot", () => {
    const tree = renderer.create(
      <Form onSubmit={jest.fn()}>{() => null}</Form>
    );

    expect(tree).toMatchSnapshot();
  });

  describe("when rendered", () => {
    const html = shallow(<Form onSubmit={jest.fn()}>{() => null}</Form>);

    test("should contain html form", () => {
      expect(html.find("form").length).toBe(1);
    });

    test("should disable html5 validation", () => {
      expect(
        html
          .find("form")
          .first()
          .props().noValidate
      ).toBe(true);
    });
  });
});

describe("Field", () => {
  test("should match snapshot", () => {
    const tree = renderer.create(
      <Form onSubmit={jest.fn()}>
        {() => <Field name="foo" component={() => null} />}
      </Form>
    );

    expect(tree).toMatchSnapshot();
  });
});

describe("FormPage", () => {
  test("should match snapshot", () => {
    const tree = renderer.create(
      <Form onSubmit={jest.fn()} pages={["foo"]}>
        {() => <FormPage page="foo">bar</FormPage>}
      </Form>
    );

    expect(tree).toMatchSnapshot();
  });
});
