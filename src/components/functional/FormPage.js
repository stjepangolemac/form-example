import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Button from "pres/Button";
import Center from "pres/Center";

import { FormConsumer } from "func/Form";

const PagesNavigation = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 15px;
  list-style: none;
  padding: 0px;

  li + li:before {
    font-size: 10px;
    padding: 0 25px;
    color: black;
    content: "▶";
  }
`;

const PageContent = styled.div`
  margin: 15px 0;
`;

const activeNavItem = css`
  font-weight: bold;
  color: gray;
`;

const NavItem = styled.li`
  color: lightgray;
  ${props => (props.active ? activeNavItem : undefined)};
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
          <PageContent>{children}</PageContent>
          <Center>
            <Button flex onClick={previousPage}>
              Previous
            </Button>
            <Button flex onClick={nextPage}>
              Next
            </Button>
          </Center>
        </div>
      );
    }}
  </FormConsumer>
);

FormPage.propTypes = {
  page: PropTypes.string.isRequired
};

export default FormPage;
