import styled from "styled-components";
import { memo } from "react";
import { white, blue, earth } from "../../utils/colors";
import thanksImg from "../../utils/images/SpecialThanksPage/thanks.png";
import postIcon from "../../utils/images/SpecialThanksPage/thanksPost.png";
import webIcon from "../../utils/images/SpecialThanksPage/web.png";
import fbIcon from "../../utils/images/SpecialThanksPage/fb.png";
import layoutIcon from "../../utils/images/SpecialThanksPage/inspiration.png";
import folderIcon from "../../utils/images/SpecialThanksPage/folder.png";

const Root = styled.div`
  background: ${white.swan};
  padding: 50px 0px;
  z-index: 1;
  position: relative;
`;

const Thanks = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 50px 0px;
  margin-bottom: 70px;

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
  }

  ::after {
    content: "";
    display: block;
    position: absolute;
    height: 230px;
    width: 230px;
    right: 30%;
    bottom: 20%;
    border-radius: 50%;
    background: ${white.smoke};
    z-index: -1;
  }
`;

const ThanksImg = styled.img`
  height: 300px;
  justify-content: center;
`;

const SpecialThanksContainer = styled.div`
  margin-bottom: 60px;
`;

const SpecialThanks = styled.div`
  position: relative;
  height: 330px;
`;

const SpecialThanksStructure = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const SpecialThanksIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 2;
`;

const SpecialThanksIconBackground = styled.div`
  height: 80px;
  width: 80px;
  background: ${white.white};
  border-radius: 50%;
  position: absolute;
  top: -14px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const SpecialThanksLine = styled.div`
  height: 200px;
  width: 5px;
  border-radius: 5%;
  background: ${blue.dark};
  margin-top: 40px;
`;

const SpecialThanksContentLeft = styled.div`
  position: absolute;
  top: 15px;
  right: 55%;
  text-align: right;

  span {
    font-weight: bold;
  }
`;

const SpecialThanksContentRight = styled(SpecialThanksContentLeft)`
  text-align: left;
  left: 55%;
  right: 0;
`;

const SpecialThanksTitle = styled.div`
  color: ${earth.wood};
  font-size: 30px;
  font-weight: bold;
`;

const SpecialThanksDiscription = styled.div`
  color: ${blue.darker};
  font-size: 18px;
  margin-top: 30px;
  line-height: 30px;
  max-height: 170px;
  overflow: scroll;
  text-overflow: ellipsis;
`;

const SpecialThanksLinksLeft = styled.div`
  display: flex;
  justify-content: right;
  margin: 10px 0px;
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
