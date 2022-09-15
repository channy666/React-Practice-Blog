import styled from "styled-components";
import { memo } from "react";
import { blue, earth, white } from "../utils/colors";
import websiteLogo from "../utils/images/LOGO.png";
import emailIcon from "../utils/images/email.png";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../utils/breakpoints";

const FooterContainer = styled.div`
  width: 100%;
  background: ${white.beidge};
  padding: 50px 7vw;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-top: 1px solid rgba(60, 63, 78, 0.1);

  ${MEDIA_QUERY_LG} {
    flex-direction: column;
  }
`;

const FooterLeft = styled.div``;

const WebsiteBrand = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  ${MEDIA_QUERY_LG} {
    justify-content: center;
  }
`;

const WebsiteLogo = styled.img`
  height: 60px;
  width: auto;
  margin-right: 10px;

  ${MEDIA_QUERY_LG} {
    height: 50px;
  }

  ${MEDIA_QUERY_SM} {
    height: 40px;
  }
`;

const WebsiteName = styled.div`
  font-size: 27px;
  font-weight: bold;
  color: ${blue.darker};
  width: 220px;
  line-height: 33px;
  letter-spacing: 1.5px;

  span {
    color: ${earth.honey};
  }

  ${MEDIA_QUERY_LG} {
    font-size: 22px;
    line-height: 25px;
    width: auto;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 18px;
    line-height: 22px;
    width: auto;
  }
`;

const FooterDescription = styled.div`
  line-height: 30px;
  font-size: 16px;
  color: ${blue.darkest};

  span {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: ${earth.chocolate};

    :hover {
      color: ${earth.honey};
    }
  }

  ${MEDIA_QUERY_LG} {
    text-align: center;
    font-size: 14px;
    line-height: 25px;
  }

  ${MEDIA_QUERY_SM} {
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }
`;

const ContactUs = styled.div`
  padding: 0px 5vw;

  ${MEDIA_QUERY_LG} {
    padding: 0px;
    border-top: 1px solid rgba(60, 63, 78, 0.1);
    padding-top: 30px;
    margin-top: 30px;
  }
`;

const ContactUsTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 3px;
  color: ${blue.darker};
  display: flex;
  align-items: center;

  ${MEDIA_QUERY_LG} {
    font-size: 23px;
    justify-content: center;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 20px;
    justify-content: center;
  }
`;

const ContactUsContent = styled.div``;

const ContactUsDetail = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${MEDIA_QUERY_LG} {
    justify-content: center;
    margin-top: 20px;
  }
`;

const ContactUsIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 15px;

  ${MEDIA_QUERY_LG} {
    height: 25px;
    width: 25px;
  }

  ${MEDIA_QUERY_SM} {
    height: 20px;
    width: 20px;
  }
`;

const Email = styled.div`
  color: ${blue.darker};
  letter-spacing: 1px;

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterLeft>
        <WebsiteBrand>
          <WebsiteLogo src={websiteLogo} alt="Logo" />
          <WebsiteName>
            Techology
            <br />
            <span>Law Center</span>
          </WebsiteName>
        </WebsiteBrand>
        <FooterDescription>
          本網站為練習用網站，文章皆引用自
          <span>清華大學區塊鏈法律與政策研究中心</span>
          ，僅文章內之星星數為虛構。
          <br />
          欲造訪<span>清華大學區塊鏈法律與政策研究中心</span>請至{" "}
          <a
            href="https://blpc.site.nthu.edu.tw/"
            target="_blank"
            rel="noreferrer"
          >
            研究中心網站
          </a>{" "}
          或{" "}
          <a
            href="https://www.facebook.com/BlockchainLawcenter/"
            target="_blank"
            rel="noreferrer"
          >
            官方臉書
          </a>
          。
        </FooterDescription>
      </FooterLeft>
      <ContactUs>
        <ContactUsTitle>
          <WebsiteLogo src={websiteLogo} alt="Logo" />
          聯絡我們
        </ContactUsTitle>
        <ContactUsContent>
          <ContactUsDetail>
            <ContactUsIcon $img={emailIcon} />
            <Email>chthonic3719@gmail.com</Email>
          </ContactUsDetail>
        </ContactUsContent>
      </ContactUs>
    </FooterContainer>
  );
}

export default memo(Footer);
