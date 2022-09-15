import styled from "styled-components";
import { memo } from "react";
import { white, blue, earth } from "../../utils/colors";
import thanksImg from "../../utils/images/SpecialThanksPage/thanks.png";
import postIcon from "../../utils/images/SpecialThanksPage/thanksPost.png";
import webIcon from "../../utils/images/SpecialThanksPage/web.png";
import fbIcon from "../../utils/images/SpecialThanksPage/fb.png";
import layoutIcon from "../../utils/images/SpecialThanksPage/inspiration.png";
import folderIcon from "../../utils/images/SpecialThanksPage/folder.png";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../utils/breakpoints";

const Root = styled.div`
  background: ${white.swan};
  padding: 50px 7vw;
  z-index: 1;
  position: relative;

  ${MEDIA_QUERY_LG} {
    padding: 40px 7vw;
  }

  ${MEDIA_QUERY_MD} {
    padding: 35px 8vw;
  }

  ${MEDIA_QUERY_SM} {
    padding: 20px 10vw;
  }
`;

const Thanks = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 50px 0px;
  margin-bottom: 70px;

  ${MEDIA_QUERY_LG} {
    margin-bottom: 60px;
  }

  ${MEDIA_QUERY_MD} {
    margin-bottom: 50px;
  }

  ${MEDIA_QUERY_SM} {
    padding: 40px 0px;
    margin-bottom: 20px;
  }

  ::before {
    content: "";
    display: block;
    position: absolute;
    height: 150px;
    width: 150px;
    right: 58%;
    border-radius: 50%;
    background: ${white.white};
    z-index: -1;

    ${MEDIA_QUERY_XL} {
      height: 140px;
      width: 140px;
      right: 60%;
    }

    ${MEDIA_QUERY_LG} {
      height: 128px;
      width: 128px;
      right: 65%;
    }

    ${MEDIA_QUERY_MD} {
      height: 120px;
      width: 120px;
    }

    ${MEDIA_QUERY_SM} {
      height: 95px;
      width: 95px;
      right: 67%;
    }
  }

  ::after {
    content: "";
    display: block;
    position: absolute;
    height: 230px;
    width: 230px;
    right: 28%;
    bottom: 20%;
    border-radius: 50%;
    background: ${white.smoke};
    z-index: -1;

    ${MEDIA_QUERY_XL} {
      height: 210px;
      width: 210px;
      right: 24%;
    }

    ${MEDIA_QUERY_LG} {
      height: 195px;
      width: 195px;
      right: 18%;
    }

    ${MEDIA_QUERY_MD} {
      height: 185px;
      width: 185px;
      right: 13%;
    }

    ${MEDIA_QUERY_SM} {
      height: 140px;
      width: 140px;
      right: 4%;
    }
  }
`;

const ThanksImg = styled.img`
  height: 300px;
  justify-content: center;

  ${MEDIA_QUERY_XL} {
    height: 280px;
  }

  ${MEDIA_QUERY_LG} {
    height: 260px;
  }

  ${MEDIA_QUERY_MD} {
    height: 240px;
  }

  ${MEDIA_QUERY_SM} {
    height: 180px;
  }
`;

const SpecialThanksContainer = styled.div`
  margin-bottom: 60px;
`;

const SpecialThanks = styled.div`
  position: relative;
  height: 330px;

  ${MEDIA_QUERY_XL} {
    height: 300px;
  }

  ${MEDIA_QUERY_LG} {
    height: 290px;
  }

  ${MEDIA_QUERY_MD} {
    height: 285px;
  }

  ${MEDIA_QUERY_SM} {
    height: 270px;
  }
`;

const SpecialThanksStructure = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  ${MEDIA_QUERY_SM} {
    right: 30vw;
  }
`;

const SpecialThanksIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 2;

  ${MEDIA_QUERY_XL} {
    height: 47px;
    width: 47px;
  }

  ${MEDIA_QUERY_LG} {
    height: 44px;
    width: 44px;
  }

  ${MEDIA_QUERY_MD} {
    height: 41px;
    width: 41px;
  }

  ${MEDIA_QUERY_SM} {
    height: 35px;
    width: 35px;
  }
`;

const SpecialThanksIconBackground = styled.div`
  height: 80px;
  width: 80px;
  background: ${white.white};
  border-radius: 50%;
  position: absolute;
  top: -14px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  ${MEDIA_QUERY_XL} {
    height: 75px;
    width: 75px;
    top: -13px;
  }

  ${MEDIA_QUERY_LG} {
    height: 70px;
    width: 70px;
    top: -12px;
  }

  ${MEDIA_QUERY_MD} {
    height: 65px;
    width: 65px;
    top: -11px;
  }

  ${MEDIA_QUERY_SM} {
    height: 58px;
    width: 58px;
    top: -11px;
  }
`;

const SpecialThanksLine = styled.div`
  height: 200px;
  width: 5px;
  border-radius: 5%;
  background: ${blue.dark};
  margin-top: 40px;

  ${MEDIA_QUERY_XL} {
    height: 185px;
    margin-top: 35px;
  }

  ${MEDIA_QUERY_LG} {
    height: 176px;
  }

  ${MEDIA_QUERY_MD} {
    height: 173px;
  }
`;

const SpecialThanksContentLeft = styled.div`
  position: absolute;
  top: 12px;
  right: 56%;
  text-align: right;

  ${MEDIA_QUERY_XL} {
    top: 9px;
  }

  ${MEDIA_QUERY_LG} {
    top: 7px;
    right: 58%;
  }

  ${MEDIA_QUERY_MD} {
    top: 8px;
    right: 59%;
  }

  ${MEDIA_QUERY_SM} {
    top: 8px;
    right: 0%;
    left: 27%;
    text-align: left;
    margin-right: 1vw;
  }

  span {
    font-weight: bold;
  }
`;

const SpecialThanksContentRight = styled(SpecialThanksContentLeft)`
  text-align: left;
  left: 56%;
  right: 0;

  ${MEDIA_QUERY_LG} {
    left: 58%;
  }

  ${MEDIA_QUERY_MD} {
    left: 59%;
  }

  ${MEDIA_QUERY_SM} {
    left: 27%;
  }
`;

const SpecialThanksTitle = styled.div`
  color: ${earth.wood};
  font-size: 30px;
  font-weight: bold;

  ${MEDIA_QUERY_XL} {
    font-size: 28px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 25px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 22px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 21px;
  }
`;

const SpecialThanksDiscription = styled.div`
  color: ${blue.darker};
  font-size: 18px;
  margin-top: 30px;
  line-height: 30px;
  max-height: 170px;
  overflow: scroll;
  text-overflow: ellipsis;

  ${MEDIA_QUERY_XL} {
    font-size: 17px;
    margin-top: 25px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 16px;
    margin-top: 23px;
    line-height: 24px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 15px;
    margin-top: 23px;
    line-height: 25px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    margin-top: 30px;
    line-height: 18px;
  }
`;

const SpecialThanksLinksLeft = styled.div`
  display: flex;
  justify-content: right;
  margin: 10px 0px;

  ${MEDIA_QUERY_SM} {
    justify-content: left;
  }
`;

const SpecialThanksLinksRight = styled(SpecialThanksLinksLeft)`
  justify-content: left;
`;

const LinksIcon = styled.a`
  background-image: url(${(props) => props.$img});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 30px;
  width: 30px;
  margin: 0px 7px;
  cursor: pointer;

  ${MEDIA_QUERY_XL} {
    height: 28px;
    width: 28px;
  }

  ${MEDIA_QUERY_LG} {
    height: 26px;
    width: 26px;
  }

  ${MEDIA_QUERY_MD} {
    height: 24px;
    width: 24px;
  }

  ${MEDIA_QUERY_SM} {
    height: 20px;
    width: 20px;
    margin: 0px 3px;
  }

  :hover {
    transform: scale(1.1);
  }
`;

const SpecialThanksbottom = styled.div`
  height: 23px;
  width: 23px;
  background: ${blue.dark};
  margin: 0 auto;
  border-radius: 50%;

  ${MEDIA_QUERY_MD} {
    height: 22px;
    width: 22px;
  }

  ${MEDIA_QUERY_SM} {
    height: 18px;
    width: 18px;
    margin-left: 8vw;
  }
`;

function ContactUsPage() {
  return (
    <Root>
      <Thanks>
        <ThanksImg src={thanksImg} alt="Thanks" />
      </Thanks>
      <SpecialThanksContainer>
        <SpecialThanks>
          <SpecialThanksStructure>
            <SpecialThanksIcon $img={postIcon} />
            <SpecialThanksIconBackground />
            <SpecialThanksLine />
          </SpecialThanksStructure>
          <SpecialThanksContentLeft>
            <SpecialThanksTitle>
              清華大學區塊鏈法律與政策研究中心
            </SpecialThanksTitle>
            <SpecialThanksDiscription>
              感謝<span>清華大學區塊鏈法律與政策研究中心</span>
              <br />
              同意本站引用專業之區塊鏈、科技法律相關文章
              <br />
              更多資訊請見
            </SpecialThanksDiscription>
            <SpecialThanksLinksLeft>
              <LinksIcon
                $img={webIcon}
                href="https://blpc.site.nthu.edu.tw/"
                target="_blank"
                title="website"
              />
              <LinksIcon
                $img={fbIcon}
                href="https://www.facebook.com/BlockchainLawcenter"
                target="_blank"
                title="Facebook"
              />
            </SpecialThanksLinksLeft>
          </SpecialThanksContentLeft>
        </SpecialThanks>
        <SpecialThanks>
          <SpecialThanksStructure>
            <SpecialThanksIcon $img={layoutIcon} />
            <SpecialThanksIconBackground />
            <SpecialThanksLine />
          </SpecialThanksStructure>
          <SpecialThanksContentRight>
            <SpecialThanksTitle>Freepik</SpecialThanksTitle>
            <SpecialThanksDiscription>
              Website layout inspiration from <span>Slidesgo</span>
              <br />
              Icons from <span>Flaticon</span>
              <br />
              All by <span>Freepik</span>
              <br />
              For more information
            </SpecialThanksDiscription>
            <SpecialThanksLinksRight>
              <LinksIcon
                $img={webIcon}
                href="https://blpc.site.nthu.edu.tw/"
                target="_blank"
                title="website"
              />
              <LinksIcon
                $img={fbIcon}
                href="https://www.facebook.com/BlockchainLawcenter"
                target="_blank"
                title="Facebook"
              />
            </SpecialThanksLinksRight>
          </SpecialThanksContentRight>
        </SpecialThanks>
        <SpecialThanks>
          <SpecialThanksStructure>
            <SpecialThanksIcon $img={folderIcon} />
            <SpecialThanksIconBackground />
            <SpecialThanksLine />
          </SpecialThanksStructure>
          <SpecialThanksContentLeft>
            <SpecialThanksTitle>{"Unsplash & Imgur"}</SpecialThanksTitle>
            <SpecialThanksDiscription>
              All photos and images from <span>Unsplash</span>
            </SpecialThanksDiscription>
            <SpecialThanksLinksLeft>
              <LinksIcon
                $img={webIcon}
                href="https://unsplash.com/"
                target="_blank"
                title="website"
              />
              <LinksIcon
                $img={fbIcon}
                href="https://www.facebook.com/unsplash/?utm_source=unsplash&utm_medium=referral"
                target="_blank"
                title="Facebook"
              />
            </SpecialThanksLinksLeft>
            <SpecialThanksDiscription>
              All photos and images hosting on <span>Imgur</span>
            </SpecialThanksDiscription>
            <SpecialThanksLinksLeft>
              <LinksIcon
                $img={webIcon}
                href="https://imgur.com/"
                target="_blank"
                title="website"
              />
              <LinksIcon
                $img={fbIcon}
                href="https://www.facebook.com/imgur/"
                target="_blank"
                title="Facebook"
              />
            </SpecialThanksLinksLeft>
          </SpecialThanksContentLeft>
        </SpecialThanks>
        <SpecialThanksbottom />
      </SpecialThanksContainer>
    </Root>
  );
}

export default memo(ContactUsPage);
