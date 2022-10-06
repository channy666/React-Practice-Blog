import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/PostsPage/PostsPage";
import PostPage from "./pages/PostPage/PostPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import EditPostPage from "./pages/EditPostPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ForumsPage from "./pages/ForumsPage";
import ForumPage from "./pages/ForumPage";
import SearchPage from "./pages/SearchPage";
import SpecialThanksPage from "./pages/SpecialThanksPage";
import { AuthContext } from "./context";
import { getAuthToken, setAuthToken } from "./utils/authorization";
import { getMe } from "./WebAPI";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "./utils/breakpoints";
import { white, earth } from "./utils/colors";

const Wrapper = styled.div`
  min-height: 900px;
  min-width: 1200px;
  background: ${white.swan};
  width: 100%;
  overflow: hidden;

  ${MEDIA_QUERY_XL} {
    min-width: 992px;
  }

  ${MEDIA_QUERY_LG} {
    min-width: 768px;
  }

  ${MEDIA_QUERY_MD} {
    min-width: 576px;
  }

  ${MEDIA_QUERY_SM} {
    min-width: 360px;
  }
`;

const marquee1 = keyframes`
  from {transform: translateX(100%)}
  to {transform: translateX(-100%)}
`;

const marquee2 = keyframes`
  from {transform: translateX(0%)}
  to {transform: translateX(-200%)}
`;

const DeclarationContainer = styled.div`
  width: 100%;
  display: flex;
  background: rgba(101, 37, 26, 0.75);
  color: ${white.white};
  z-index: 5;
  position: fixed;
  top: 0;
  height: 45px;

  ${MEDIA_QUERY_LG} {
    height: 40px;
  }

  ${MEDIA_QUERY_SM} {
    height: 35px;
  }

  & :nth-child(1) {
    ${MEDIA_QUERY_LG} {
      animation: ${marquee1} 30s linear infinite;
    }
  }

  & :nth-child(2) {
    display: none;

    ${MEDIA_QUERY_LG} {
      display: flex;
      animation: ${marquee2} 30s linear infinite;
      animation-delay: -15s;
    }
  }
`;

const Declaration = styled.div`
  display: flex;
  background: transparent;
  color: ${white.white};
  align-items: center;
  margin: 0 auto;
  z-index: 6;
  font-weight: bold;
  letter-spacing: 3px;
  font-size: 20px;
  height: 45px;
  white-space: nowrap;

  ${MEDIA_QUERY_LG} {
    font-size: 18px;
    height: 40px;
    min-width: 992px;
    justify-content: left;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 16px;
    height: 35px;
    min-width: 890px;
  }

  span {
    color: ${earth.honey};
  }
`;

function App() {
  const [user, setUser] = useState();
  const [isConfirmingUser, setIsConfirmingUser] = useState(true);

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((res) => {
        if (res.ok === 1) {
          setUser(res.data);
          setIsConfirmingUser(false);
          return;
        }
        setAuthToken("");
        setUser(null);
        setIsConfirmingUser(false);
      });
    } else {
      setUser(null);
      setIsConfirmingUser(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isConfirmingUser,
      }}
    >
      <Wrapper>
        <DeclarationContainer>
          <Declaration>
            『網站聲明』本網站為練習用網站，所有資料皆取材自公開資源，不代表任何官方網站與立場。
          </Declaration>
          <Declaration>
            【網站聲明】本網站為練習用網站，所有資料皆取材自公開資源，不代表任何官方網站與立場。
          </Declaration>
        </DeclarationContainer>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Posts/:category" element={<PostsPage />} />
            <Route path="/Post/:id" element={<PostPage />} />
            <Route path="/Forums" element={<ForumsPage />} />
            <Route path="/Forum/:id" element={<ForumPage />} />
            <Route path="/CreatePost" element={<CreatePostPage />} />
            <Route path="/EditPost/:id" element={<EditPostPage />} />
            <Route path="/Search/:searchValue" element={<SearchPage />} />
            <Route path="/Login" element={<LogInPage />} />
            <Route path="/SpecialThanks" element={<SpecialThanksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </Wrapper>
    </AuthContext.Provider>
  );
}

export default App;
