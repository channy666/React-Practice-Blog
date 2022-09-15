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
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../utils/breakpoints";
import HamburgerButton from "../component/HamburgerButton";

const Wrapper = styled.div``;

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
  align-items: center;
  z-index: 2;

  ${MEDIA_QUERY_LG} {
    height: 125px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
`;

const WebsiteBrand = styled.div`
  display: flex;
`;

const WebsiteLogo = styled.img`
  height: 110px;
  width: auto;
  margin-left: 10%;

  ${MEDIA_QUERY_XL} {
    height: 100px;
    margin-left: 5%;
  }

  ${MEDIA_QUERY_LG} {
    height: 90px;
  }

  ${MEDIA_QUERY_SM} {
    height: 75px;
  }
`;

const WebsiteName = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: ${blue.darker};
  margin-left: 5%;
  width: 230px;
  margin-top: 15px;

  div {
    color: ${earth.honey};
    margin-top: 10px;
  }

  ${MEDIA_QUERY_XL} {
    font-size: 28px;
    width: 190px;
    margin-top: 13px;
    margin-left: 4%;

    div {
      margin-top: 9px;
    }
  }

  ${MEDIA_QUERY_LG} {
    font-size: 26px;
    width: 180px;
    margin-top: 10px;

    div {
      margin-top: 8px;
    }
  }

  ${MEDIA_QUERY_SM} {
    font-size: 23px;
    width: 170px;
    margin-top: 8px;

    div {
      margin-top: 6px;
    }
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1vw;

  ${MEDIA_QUERY_XL} {
    margin: 0;
  }

  ${MEDIA_QUERY_LG} {
    display: none;
  }
`;

const NavBarSiteContainer = styled.div`
  display: flex;
  text-align: center;
  margin-left: 1vw;

  ${MEDIA_QUERY_XL} {
    margin: 0;
  }

  ${MEDIA_QUERY_LG} {
    flex-direction: column;
    margin: 0;
  }
`;

const Nav = styled.div`
  color: ${blue.darker};
  font-size: 19px;
  font-weight: bold;
  width: 100px;
  justify-content: center;
  margin-right: 1.2vw;
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

  ${MEDIA_QUERY_XL} {
    margin-right: 0.7vw;
    font-size: 17px;
  }

  ${MEDIA_QUERY_LG} {
    margin: 15px 0;
    font-size: 19px;
  }
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

  ${MEDIA_QUERY_LG} {
    background: transparent;
    padding-top: 10px;
  }
`;

const NavPost = styled.div`
  font-size: 18px;
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

  ${MEDIA_QUERY_XL} {
    font-size: 16px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 18px;
    background: ${white.swan};
    height: 40px;
  }
`;

const NavBarUserContainer = styled(NavBarSiteContainer)`
  margin-left: 0px;

  ${MEDIA_QUERY_XL} {
    margin: 0px;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  border-radius: 5px;
  cursor: pointer;
  background: ${white.swan};
  border: 1px solid rgba(60, 63, 78, 0.1);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  bottom: 0px;
  right: 2vw;
  position: absolute;

  ${MEDIA_QUERY_LG} {
    position: static;
    margin: 15px;
  }

  ${(props) =>
    props.$hide &&
    `
    ${MEDIA_QUERY_LG} {
      display: none;
    }
  `}
`;

const Search = styled.input`
  height: 35px;
  width: 13vw;
  border-radius: 5px;
  background: ${white.swan};
  border: none;
  font-size: 16px;
  min-width: 130px;

  ${MEDIA_QUERY_LG} {
    width: 20vw;
  }
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

const HamburgerNavBar = styled.div`
  display: none;
  margin: 0 auto;
  padding: 10px 0 5px 0;
  flex-direction: column;
  background: rgba(60, 63, 78, 0.1);
  width: 95vw;
  border-radius: 5px;
  align-items: center;
  height: 370px;

  ${(props) =>
    props.$user &&
    `
    height: 410px;
  `}

  ${MEDIA_QUERY_LG} {
    transition: all 1s;
    display: flex;
    margin-top: -390px;

    ${(props) =>
      props.$user &&
      !props.$show &&
      `
      margin-top: -430px;
    `}

    ${(props) =>
      props.$show &&
      `
      margin: 0 auto;
    `}
  }
`;

const HamburgerButtonContainer = styled.div`
  display: none;

  ${MEDIA_QUERY_LG} {
    display: flex;
  }
`;

function Header() {
  const location = useLocation();
  const searchBarInputRef = useRef();
  const { user, setUser, isConfirmingUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNavPosts, setShowNavPosts] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    if (showSearchBar && searchBarInputRef) searchBarInputRef.current.focus();
  }, [showSearchBar, searchBarInputRef]);

  useEffect(() => {
    setShowSearchBar(false);
    setShowNavBar(false);
    setShowNavPosts(false);
  }, [location.pathname]);

  const handleLogOut = useCallback(() => {
    setAuthToken("");
    setUser(null);
    navigate("/");
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

  const handleShowSearchBar = useCallback(() => {
    setShowSearchBar((prevState) => !prevState);
  }, []);

  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderRight>
          <WebsiteBrand>
            <WebsiteLogo src={HeaderLogo} alt="Logo" />
            <WebsiteName>
              Techology <div>Law Center</div>
            </WebsiteName>
          </WebsiteBrand>
          <NavBar>
            <NavBarSite
              location={location}
              showNavPostsState={{ showNavPosts, setShowNavPosts }}
            />
          </NavBar>
        </HeaderRight>
        <NavBar>
          <NavBarUser
            user={user}
            isConfirmingUser={isConfirmingUser}
            location={location}
            handleLogOut={handleLogOut}
          />
          <SearchIcon onClick={handleShowSearchBar} $active={showSearchBar}>
            <SearchIconHead />
            <SearchIconBody />
          </SearchIcon>
        </NavBar>
        {showSearchBar && (
          <SearchBar
            searchBarValue={searchBarValue}
            handleSearchBarChange={handleSearchBarChange}
            handleSearchBarSubmit={handleSearchBarSubmit}
            searchBarInputRef={searchBarInputRef}
            hideWithNavBar
          />
        )}
        <HamburgerButtonContainer>
          <HamburgerButton
            isExpended={showNavBar}
            setIsExpended={setShowNavBar}
          />
        </HamburgerButtonContainer>
      </HeaderContainer>
      <HamburgerNavBar $show={showNavBar} $user={user}>
        <NavBarSite
          location={location}
          showNavPostsState={{ showNavPosts, setShowNavPosts }}
        />
        <NavBarUser
          user={user}
          isConfirmingUser={isConfirmingUser}
          location={location}
          handleLogOut={handleLogOut}
        />
        <SearchBarContainer>
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
        </SearchBarContainer>
      </HamburgerNavBar>
    </Wrapper>
  );
}

function NavBarSite({ location, showNavPostsState }) {
  const { showNavPosts, setShowNavPosts } = showNavPostsState;

  const handleMouseEnterNavPosts = useCallback(() => {
    setShowNavPosts(true);
  }, []);

  const handleMouseLeaveNavPosts = useCallback(() => {
    setShowNavPosts(false);
  }, []);

  return (
    <NavBarSiteContainer>
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
    </NavBarSiteContainer>
  );
}

function NavBarUser({ user, isConfirmingUser, location, handleLogOut }) {
  return (
    <Wrapper>
      {user && !isConfirmingUser && (
        <NavBarUserContainer>
          <Nav
            $active={location.pathname === "/CreatePost"}
            as={Link}
            to="/CreatePost"
          >
            發佈文章
          </Nav>
          <Nav onClick={handleLogOut}>登出</Nav>
        </NavBarUserContainer>
      )}
      {!user && !isConfirmingUser && (
        <NavBarUserContainer>
          <Nav
            $active={location.pathname === "/LogIn"}
            as={Link}
            to="/LogIn"
            state={location.pathname}
          >
            註冊 / 登入
          </Nav>
        </NavBarUserContainer>
      )}
    </Wrapper>
  );
}

function SearchBar({
  searchBarValue,
  handleSearchBarChange,
  handleSearchBarSubmit,
  searchBarInputRef,
  hideWithNavBar,
}) {
  return (
    <SearchBarContainer $hide={hideWithNavBar}>
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
    </SearchBarContainer>
  );
}

export default memo(Header);
