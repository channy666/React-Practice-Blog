import styled from "styled-components";
import { useCallback } from "react";
import { earth, white } from "../utils/colors";

const HamburgerButtonContainer = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 5px;
  cursor: pointer;
  border: 1.5px solid rgba(60, 63, 78, 0.2);
  box-sizing: border-box;
  padding: 8.5px 0px;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: space-between;
  z-index: 4;
  background: ${white.swan};

  :hover {
    border-color: rgba(60, 63, 78, 0.3);

    div {
      background: rgba(60, 63, 78, 0.5);
    }
  }

  ${(props) =>
    props.$active &&
    `
    border-color: ${earth.honey};

    div {
      background: ${earth.honey};
      width: 30px;
      transition: all 1s;
    }

    & :first-child {
      transform: rotate(45deg) translate(8px, 8px);
    }

    & :nth-child(2) {
      width: 0px;
    }

    & :last-child {
      transform: rotate(135deg) translate(-8px, 7px);
    }
  `}
`;

const HamburgerButtonLine = styled.div`
  height: 3px;
  width: 28px;
  background: rgba(60, 63, 78, 0.2);
  border-radius: 20px;
  transition: all 1s;

  ${(props) =>
    props.$length === "short" &&
    `
    width: 24px;
  `}
`;

function HamburgerButton({ isExpended, setIsExpended }) {
  const handleExpend = useCallback(() => {
    setIsExpended((prevState) => !prevState);
  }, []);

  return (
    <HamburgerButtonContainer onClick={handleExpend} $active={isExpended}>
      <HamburgerButtonLine />
      <HamburgerButtonLine $length="short" />
      <HamburgerButtonLine />
    </HamburgerButtonContainer>
  );
}

export default HamburgerButton;
