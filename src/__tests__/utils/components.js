import React from "react";
import renderer from "react-test-renderer";

import AppContainer from "pres/AppContainer";
import CheckboxInput from "pres/CheckboxInput";
import TextInput from "pres/TextInput";

const presComponents = [[AppContainer, {}], [CheckboxInput, {}], [TextInput, {}]];

presComponents.forEach(args => {
  test( "presentational componenets should match snapshots",
    () => {
      const Component = args[0]
      const props = args[1]

      const tree = renderer.create(<Component {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );
});
