import styled from "styled-components";
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

const Wrapper = styled.div`
  min-height: 600px;
  min-width: 1200px;
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
            <Route path="/Search/:value" element={<SearchPage />} />
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
