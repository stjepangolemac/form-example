import React from "react";
import PropTypes from "prop-types";

import { FormConsumer } from "func/Form";

const FormPage = ({ page, children }) => (
  <FormConsumer>
    {({ formState: { currentPage }, previousPage, nextPage }) => {
      if (currentPage !== page) {
        return null
      }

      return (
        <div>
          {children}
          <React.Fragment>
            <button onClick={previousPage}>Back</button>
            <button onClick={nextPage}>Next</button>
          </React.Fragment>
        </div>
      );
    }}
  </FormConsumer>
);

FormPage.propTypes = {
  page: PropTypes.string.isRequired,
}

export default FormPage;
