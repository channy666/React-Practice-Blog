import styled from "styled-components";
import {
  useContext,
  useCallback,
  memo,
  useState,
  useRef,
  useEffect,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderLogo from "../utils/images/LOGO.png";
import { AuthContext } from "../context";
import { setAuthToken } from "../utils/authorization";
import { white, earth, blue } from "../utils/colors";

const HeaderContainer = styled.div`
  display: flex;
  height: 150px;
  background: ${white.swan};
  width: 100%;
  justify-content: space-between;
  position: relative;
  padding: 0px 2vw;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(60, 63, 78, 0.1);
`;

const HeaderRight = styled.div`
  display: flex;
`;

const WebsiteBrand = styled.div`
  display: flex;
`;

const WebsiteLogo = styled.img`
  height: 120px;
  width: auto;
  margin-left: 10%;
  margin-top: 15px;
`;

const WebsiteName = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: ${blue.darker};
  margin-top: 35px;
  margin-left: 5%;
  width: 220px;

  div {
    color: ${earth.honey};
    margin-top: 10px;
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1vw;
`;

const NavBarSite = styled.div`
  display: flex;
  text-align: center;
  margin-left: 1vw;
`;

const Nav = styled.div`
  color: ${blue.darker};
  font-size: 18px;
  font-weight: bold;
  width: 100px;
  justify-content: center;
  margin-right: 1.5vw;
  cursor: pointer;
  text-decoration: none;

  :hover {
    color: ${earth.honey};
  }

  ${(props) =>
    props.$active &&
    `
    color: ${earth.honey};
  `}
`;

const Navs = styled(Nav)`
  position: relative;

  :hover {
    color: ${blue.darker};
  }
`;

const NavPosts = styled.div`
  position: absolute;
  text-align: center;
  background: ${white.swan};
  width: 100%;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  z-index: 2;

  a:first-child {
    margin-bottom: 10px;
  }

  ${(props) =>
    !props.$show &&
    `
    display: none;
  `}
`;

const NavPost = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  text-decoration: none;
  color: ${blue.darker};
  border: 1px solid rgba(60, 63, 78, 0.1);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  height: 35px;

  :hover {
    color: ${earth.honey};
  }

  ${(props) =>
    props.$active &&
    `
    color: ${earth.honey};
  `}
`;

const NavBarUser = styled(NavBarSite)`
  margin-left: 0px;
`;

const SearchBar = styled.div`
  display: flex;
  border-radius: 5px;
  cursor: pointer;
  background: ${white.swan};
  border: 1px solid rgba(60, 63, 78, 0.1);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  bottom: 0px;
  right: 2vw;
  position: absolute;
`;

const Search = styled.input`
  height: 35px;
  width: 13vw;
  border-radius: 5px;
  background: ${white.swan};
  border: none;
  font-size: 16px;
  min-width: 130px;
`;

const SearchIcon = styled.div`
  height: 35px;
  width: 35px;
  position: relative;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;

  :hover {
    div:first-child {
      border: 4px solid ${earth.honey};
    }

    div:last-child {
      background: ${earth.honey};
      height: 4px;
    }
  }

  ${(props) =>
    props.$active &&
    `
    div:first-child {
      border: 4px solid ${earth.honey};
    }

    div:last-child {
      background: ${earth.honey};
      height: 4px;
    }
  `}
`;

const SearchIconHead = styled.div`
  background: none;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  border: 3.5px solid ${blue.darker};
`;

const SearchIconBody = styled.div`
  height: 4px;
  width: 12px;
  transform: rotate(45deg);
  background: ${blue.darker};
  border-radius: 5px;
  margin-left: 12px;
`;

function Header() {
  const location = useLocation();
  const searchBarInputRef = useRef();
  const { user, setUser, isConfirmingUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNavPosts, setShowNavPosts] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    if (showSearchBar && searchBarInputRef) searchBarInputRef.current.focus();
  }, [showSearchBar, searchBarInputRef]);

  useEffect(() => {
    setShowSearchBar(false);
  }, [location.pathname]);

  const handleLogOut = useCallback(() => {
    setAuthToken("");
    setUser(null);
    navigate("/");
  }, []);

  const handleMouseEnterNavPosts = useCallback(() => {
    setShowNavPosts(true);
  }, []);

  const handleMouseLeaveNavPosts = useCallback(() => {
    setShowNavPosts(false);
  }, []);

  const handleSearchBarChange = useCallback((e) => {
    setSearchBarValue(e.target.value);
  }, []);

  const handleSearchBarSubmit = useCallback(
    (e) => {
      if (!searchBarValue) return;

      if (e.key && e.key !== "Enter") return;

      navigate(`/Search/${searchBarValue}`);
      setSearchBarValue("");
    },
    [searchBarValue]
  );

  const handleShowSearchBar = () => {
    setShowSearchBar((prevState) => !prevState);
  };

  return (
    <HeaderContainer>
      <HeaderRight>
        <WebsiteBrand>
          <WebsiteLogo src={HeaderLogo} alt="Logo" />
          <WebsiteName>
            Techology <div>Law Center</div>
          </WebsiteName>
        </WebsiteBrand>
        <NavBar>
          <NavBarSite>
            <Nav $active={location.pathname === "/"} as={Link} to="/">
              首頁
            </Nav>
            <Navs
              $active={
                location.pathname === "/Posts/Research" ||
                location.pathname === "/Posts/Analysis" ||
                location.pathname.includes("/Post")
              }
              onMouseEnter={handleMouseEnterNavPosts}
              onMouseLeave={handleMouseLeaveNavPosts}
            >
              文章列表
              <NavPosts $show={showNavPosts}>
                <NavPost
                  as={Link}
                  to="/Posts/Research"
                  $active={location.pathname === "/Posts/Research"}
                >
                  研究觀點
                </NavPost>
                <NavPost
                  as={Link}
                  to="/Posts/Analysis"
                  $active={location.pathname === "/Posts/Analysis"}
                >
                  要文評析
                </NavPost>
              </NavPosts>
            </Navs>
            <Nav
              $active={
                location.pathname === "/Forums" ||
                location.pathname.includes("/Forum")
              }
              as={Link}
              to="/Forums"
            >
              公眾論壇
            </Nav>
            <Nav
              $active={location.pathname === "/SpecialThanks"}
              as={Link}
              to="/SpecialThanks"
            >
              特別感謝
            </Nav>
          </NavBarSite>
        </NavBar>
      </HeaderRight>
      <NavBar>
        {user && !isConfirmingUser && (
          <NavBarUser>
            <Nav
              $active={location.pathname === "/CreatePost"}
              as={Link}
              to="/CreatePost"
            >
              發佈文章
            </Nav>
            <Nav onClick={handleLogOut}>登出</Nav>
          </NavBarUser>
        )}
        {!user && !isConfirmingUser && (
          <NavBarUser>
            <Nav $active={location.pathname === "/LogIn"} as={Link} to="/LogIn">
              註冊 / 登入
            </Nav>
          </NavBarUser>
        )}
        <SearchIcon onClick={handleShowSearchBar} $active={showSearchBar}>
          <SearchIconHead />
          <SearchIconBody />
        </SearchIcon>
      </NavBar>
      {showSearchBar && (
        <SearchBar>
          <Search
            value={searchBarValue}
            onChange={handleSearchBarChange}
            onKeyPress={handleSearchBarSubmit}
            ref={searchBarInputRef}
          />
          <SearchIcon onClick={handleSearchBarSubmit}>
            <SearchIconHead />
            <SearchIconBody />
          </SearchIcon>
        </SearchBar>
      )}
    </HeaderContainer>
  );
}

export default memo(Header);
