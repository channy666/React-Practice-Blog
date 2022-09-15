import styled from "styled-components";
import { Link } from "react-router-dom";
import { ErrorBlock } from "../../component/Blocks";
import { white, blue, earth } from "../../utils/colors";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../utils/breakpoints";

const Root = styled.div`
  padding: 40px 0;
  height: 900px;
  background: ${white.swan};

  ${MEDIA_QUERY_LG} {
    height: 800px;
  }

  ${MEDIA_QUERY_MD} {
    height: 750px;
  }

  ${MEDIA_QUERY_SM} {
    padding: 20px 0;
  }
`;

const Container = styled.div`
  width: 45%;
  margin: 0 auto;
  padding: 50px 0px;

  ${MEDIA_QUERY_XL} {
    width: 60%;
  }

  ${MEDIA_QUERY_LG} {
    width: 65%;
  }

  ${MEDIA_QUERY_MD} {
    width: 70%;
  }

  ${MEDIA_QUERY_SM} {
    width: 80%;
  }
`;

const ErrorMessage = styled.div`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  justify-content: center;
  color: ${blue.dark};

  ${MEDIA_QUERY_LG} {
    font-size: 25px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 22px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 18px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 10%;
  flex-wrap: wrap;

  ${MEDIA_QUERY_LG} {
    margin: 30px 10%;
  }

  ${MEDIA_QUERY_MD} {
    margin: 25px 10%;
  }

  ${MEDIA_QUERY_SM} {
    margin: 15px 6%;
  }
`;

const Nav = styled.div`
  display: flex;
  width: 35%;
  height: 50px;
  cursor: pointer;
  color: ${blue.darker};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: 3px;
  padding-left: 3px;
  font-weight: bold;
  text-decoration: none;
  margin: 40px 5% 30px 5%;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(60, 63, 78, 0.2);

  :hover {
    background: ${white.smoke};
    border: none;
    color: ${earth.wood};
  }

  ${MEDIA_QUERY_LG} {
    margin: 30px 6% 30px 6%;
  }

  ${MEDIA_QUERY_MD} {
    margin: 30px 5% 25px 5%;
    width: 40%;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 16px;
    margin: 20px 6% 12px 6%;
    width: 50%;
  }
`;

function NotFoundPage() {
  return (
    <Root>
      <Container>
        <ErrorBlock backgroundColor="rgba(226, 217, 195, 0.6)">
          <ErrorMessage>頁面不存在，請嘗試其他頁面</ErrorMessage>
          <NavButtons>
            <Nav as={Link} to="/">
              首頁
            </Nav>
            <Nav as={Link} to="/Posts/Research">
              研究觀點
            </Nav>
            <Nav as={Link} to="/Posts/Analysis">
              要文評析
            </Nav>
            <Nav as={Link} to="/Forums">
              公眾論壇
            </Nav>
            <Nav as={Link} to="/SpecialThanks">
              特別感謝
            </Nav>
          </NavButtons>
        </ErrorBlock>
      </Container>
    </Root>
  );
}

export default NotFoundPage;
