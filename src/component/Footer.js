import styled from "styled-components";
import { memo } from "react";
import { blue, earth, white } from "../utils/colors";
import websiteLogo from "../utils/images/LOGO.png";
import emailIcon from "../utils/images/email.png";

const FooterContainer = styled.div`
  width: 100%;
  background: ${white.beidge};
  padding: 50px 7vw;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-top: 1px solid rgba(60, 63, 78, 0.1);
`;

const FooterLeft = styled.div``;

const WebsiteBrand = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const WebsiteLogo = styled.img`
  height: 70px;
  width: auto;
`;

const WebsiteName = styled.div`
  font-size: 27px;
  font-weight: bold;
  color: ${blue.darker};
  width: 220px;
  line-height: 33px;
  margin-left: 10px;
  letter-spacing: 1.5px;

  span {
    color: ${earth.honey};
  }
`;

const FooterDescription = styled.div`
  line-height: 30px;
  font-size: 15px;
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
`;

const ContactUs = styled.div`
  padding: 0px 5vw;
`;

const ContactUsTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin: 15px 0px;
  letter-spacing: 3px;
  color: ${blue.darker};
`;

const ContactUsContent = styled.div``;

const ContactUsDetail = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;

const ContactUsIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 15px;
`;

const Email = styled.div`
  color: ${blue.darker};
  letter-spacing: 1px;
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
        <ContactUsTitle>聯絡我們</ContactUsTitle>
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
