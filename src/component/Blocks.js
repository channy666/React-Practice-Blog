import styled from "styled-components";
import logo from "../utils/images/LOGO.png";
import { blue } from "../utils/colors";

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: ${blue.darker};
  height: 65px;
  line-height: 45px;
  box-sizing: border-box;
  display: flex;
  background: ${(props) => props.$backgroundColor};
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 90%;

  ${(props) =>
    props.$size === "big" &&
    `
    font-size: 34px;
    height: 90px;
    line-height: 45px;
    align-items: center;
    margin: 10px 6%;
    justify-content: center;
    width: 88%;
  `}

  ${(props) =>
    props.$size === "small" &&
    `
    font-size: 16px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    justify-content: center;
    width: 95%;
  `}

  ${(props) =>
    props.$backgroundColor === "transparent" &&
    `
    box-shadow: none;
  `}
`;

const TitleIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 45px;
  width: 45px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-right: 12px;
  display: flex;
  align-self: center;

  ${(props) =>
    props.$size === "big" &&
    `
    height: 60px;
    width: 60px;
    margin: 0px 15px 0px 0px;
    `}

  ${(props) =>
    props.$size === "small" &&
    `
    height: 30px;
    width: 30px;
    margin: 0px 7px 0px 0px;
    `}
`;

const Content = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const BlockContainer = styled.div`
  background: ${(props) => props.$backgroundColor};
  border-radius: 10px;
  padding: 40px 15px 0px 15px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const ErrorContent = styled.div`
  width: 100%;
  height: 520px;
  background: transparent;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;

  ${(props) =>
    props.$size === "small" &&
    `
    height: 150px;
    font-size: 22px;
    letter-spacing: 1px;
  `}
`;

export function GeneralBlock({
  title,
  postBackgroundColor,
  titleBackgroundColor,
  size,
  children,
}) {
  return (
    <BlockContainer $backgroundColor={postBackgroundColor}>
      <Title $size={size} $backgroundColor={titleBackgroundColor}>
        <TitleIcon $img={logo} $size={size} />
        {title}
      </Title>
      <Content>{children}</Content>
    </BlockContainer>
  );
}

export function ErrorBlock({ size, backgroundColor, children }) {
  return (
    <BlockContainer $backgroundColor={backgroundColor}>
      <Title $size={size} $backgroundColor="transparent">
        <TitleIcon $img={logo} $size={size} />
      </Title>
      <ErrorContent $size={size}>{children}</ErrorContent>
    </BlockContainer>
  );
}
