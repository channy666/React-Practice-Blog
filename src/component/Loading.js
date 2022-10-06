import styled, { keyframes } from "styled-components";
import { blue } from "../utils/colors";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../utils/breakpoints";

const LoadingContainer = styled.div`
  ${(props) =>
    props.$size === "big" &&
    `
    width: 60vw;
    margin: 0 auto;
  `}
`;

const LoadingMessageContainer = styled.div`
  width: 100%;
  height: 400px;
  font-size: 28px;
  font-weight: bold;
  padding-top: 50px;
  letter-spacing: 3px;
  background: transparent;
  color: ${blue.darker};
  display: flex;
  justify-content: center;
  position: relative;

  ${MEDIA_QUERY_MD} {
    font-size: 26px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 24px;
  }

  ${(props) =>
    props.$size === "small" &&
    `
    font-size: 24px;
    letter-spacing: 2px;

    ${MEDIA_QUERY_XL} {
      font-size: 22px;
    }
  
    ${MEDIA_QUERY_LG} {
      font-size: 21px;

    }

    ${MEDIA_QUERY_MD} {
      font-size: 19px;
    }
  
    ${MEDIA_QUERY_SM} {
      font-size: 17px;
    }
  `}
`;

const jumpingLetter = keyframes`
  0%   {bottom: 0px;}
  50%  {bottom: 8px;}
  100% {bottom: 0px;}
`;

const Message = styled.div`
  position: relative;
  margin-right: 5px;
  animation-name: ${jumpingLetter};
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-delay: ${(props) => props.$delay}s;

  ${MEDIA_QUERY_SM} {
    margin-right: 3px;
  }

  ${(props) =>
    props.$size === "small" &&
    `
    margin-right: 3px;
  `}
`;

function Loading({ size, children }) {
  const messageArray = children.split("");

  return (
    <LoadingContainer $size={size}>
      <LoadingMessageContainer $size={size}>
        {messageArray.map((letter, index) => (
          <Message key={index} $delay={Number(index) / 4} $size={size}>
            {letter}
          </Message>
        ))}
      </LoadingMessageContainer>
    </LoadingContainer>
  );
}

export default Loading;
