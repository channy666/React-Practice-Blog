import styled from "styled-components";
import { Link } from "react-router-dom";
import { ErrorBlock } from "../../component/Blocks";
import { white, blue, earth } from "../../utils/colors";

const Root = styled.div`
  padding: 40px 0;
  height: 900px;
  background: ${white.swan};
`;

const Container = styled.div`
  width: 45%;
  margin: 0 auto;
  padding: 50px 0px;
`;

const ErrorMessage = styled.div`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  justify-content: center;
  color: ${blue.dark};
`;

const NavButtons = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  margin: 50px 10%;
  flex-wrap: wrap;
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
`;

function NotFoundPage() {
  return (
    <Root>
      <Container>
        <ErrorBlock backgroundColor={white.beidge}>
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
