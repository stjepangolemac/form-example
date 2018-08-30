import styled from "styled-components";

const Button = styled.button`
  background: ${({ primary }) => (primary ? "lightblue" : "lightgray")};
  padding: 5px 7px;
  border-radius: 2px;
  margin: 0 2px;
  flex: ${({ flex }) => flex && 1};
  width: ${({ full }) => full && "100%"};
`;

export default Button;
