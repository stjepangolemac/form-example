import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormConsumer } from "func/Form";

const PagesNavigation = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 15px;
`;

const NavItem = styled.span`
  color: ${props => (props.active ? "blue" : undefined)};
`;

function renderNavItems(pages, currentPage) {
  return pages.map(page => (
    <NavItem key={page} active={page === currentPage}>
      {page}
    </NavItem>
  ));
}

const FormPage = ({ page, children }) => (
  <FormConsumer>
    {({ formState: { currentPage }, pages, previousPage, nextPage }) => {
      if (currentPage !== page) {
        return null;
      }

      return (
        <div>
          <PagesNavigation>
            {renderNavItems(pages, currentPage)}
          </PagesNavigation>
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
  page: PropTypes.string.isRequired
};

export default FormPage;
