import styled from "styled-components";
import logo from "../utils/images/LOGO.png";
import { blue } from "../utils/colors";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../utils/breakpoints";

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

  ${MEDIA_QUERY_XL} {
    font-size: 24px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 22px;
    line-height: 42px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
    height: 55px;
    line-height: 40px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 13px;
    height: 50px;
    line-height: 35px;
    letter-spacing: 1px;
    width: 95%;
  }

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

    ${MEDIA_QUERY_XL} {
      font-size: 32px;
    }

    ${MEDIA_QUERY_LG} {
      font-size: 30px;
      height: 80px;
    }

    ${MEDIA_QUERY_SM} {
      font-size: 27px;
      height: 70px;
      margin: 10px auto;
    }
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

    ${MEDIA_QUERY_XL} {
      font-size: 14px;
      width: 100%;
    }

    ${MEDIA_QUERY_LG} {
      font-size: 16px;
      width: 100%;
    }

    ${MEDIA_QUERY_MD} {
      font-size: 14px;
      width: 100%;
    }
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

  ${MEDIA_QUERY_XL} {
    height: 40px;
    width: 40px;
  }

  ${MEDIA_QUERY_LG} {
    height: 38px;
    width: 38px;
  }

  ${MEDIA_QUERY_MD} {
    height: 35px;
    width: 35px;
    margin-right: 10px;
  }

  ${MEDIA_QUERY_SM} {
    height: 28px;
    width: 28px;
    margin-right: 8px;
  }

  ${(props) =>
    props.$size === "big" &&
    `
    height: 60px;
    width: 60px;
    margin: 0px 15px 0px 0px;

    ${MEDIA_QUERY_XL} {
      height: 50px;
      width: 50px;
    }

    ${MEDIA_QUERY_LG} {
      height: 40px;
      width: 40px;
    }
    `}

  ${(props) =>
    props.$size === "small" &&
    `
    height: 30px;
    width: 30px;
    margin: 0px 7px 0px 0px;

    ${MEDIA_QUERY_XL} {
      height: 24px;
      width: 24px;
    }
    `}
`;

const Content = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 3%;
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

  ${MEDIA_QUERY_XL} {
    font-size: 26px;
  }

  ${MEDIA_QUERY_LG} {
    padding-top: 35px;
    height: 460px;
    font-size: 24px;
  }

  ${MEDIA_QUERY_MD} {
    letter-spacing: 2px;
    padding-top: 30px;
    height: 430px;
    font-size: 22px;
  }

  ${MEDIA_QUERY_SM} {
    letter-spacing: 1px;
    padding-top: 20px;
    height: 500px;
    font-size: 20px;
  }

  ${(props) =>
    props.$size === "small" &&
    `
    height: 150px;
    font-size: 22px;
    letter-spacing: 1px;

    ${MEDIA_QUERY_XL} {
      font-size: 20px;
      letter-spacing: 1px;
      height: 150px;
    }
  
    ${MEDIA_QUERY_LG} {
      font-size: 18px;
      letter-spacing: 1px;
      height: 150px;
    }
  
    ${MEDIA_QUERY_MD} {
      font-size: 16px;
      letter-spacing: 1px;
      height: 150px;
    }
  
    ${MEDIA_QUERY_SM} {
      font-size: 16px;
      letter-spacing: 1px;
      height: 150px;
    }
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
