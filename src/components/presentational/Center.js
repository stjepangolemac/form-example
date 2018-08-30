import styled from "styled-components";

const Center = styled.div`
  display: flex;
  flex-direction: ${({ column }) => column && "column"};
  justify-content: center;
`;

export default Center;
