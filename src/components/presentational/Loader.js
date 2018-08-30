import styled from "styled-components";

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  margin-bottom: 20px;
  animation: spin 1s infinite linear;
  border-radius: 5px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  :after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 8px;
    height: 8px;
    background: lightgray;
    display: block;
  }

  :before{
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    width: 8px;
    height: 8px;
    background: gray;
    display: block;
  }
`;

export default Loader;
