import styled from "styled-components";
import { useState, memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GeneralBlock, ErrorBlock } from "./Blocks";
import { getTopPosts } from "../WebAPI";
import { blue, earth } from "../utils/colors";

const SideBarContainer = styled.div`
  width: 16vw;
  margin-right: 5vw;
  box-sizing: border-box;
`;

const ClassificationContainer = styled.div`
  height: 300px;
  width: 100%;
  margin-bottom: 70px;
  text-align: center;
  box-sizing: border-box;
`;

const ClassificationContent = styled.div`
  padding: 10px 2%;
`;

const Classification = styled.div`
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  line-height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
  color: ${blue.darkest};

  :hover {
    color: ${earth.honey};
  }

  ${(props) =>
    props.$active &&
    `
    color: ${earth.honey};
  `}
`;

const NavListContainer = styled(ClassificationContainer)`
  height: 520px;
`;

const NavListContent = styled(ClassificationContent)`
  display: flex;
  flex-direction: column;
`;

const Nav = styled(Classification)`
  text-decoration: none;
  color: ${blue.darkest};
`;

const RecentPosts = styled.div`
  width: 100%;
  margin-bottom: 20vh;
`;

const RecentPostContent = styled.div`
  padding: 15px 1% 10px 1%;
  display: flex;
  flex-direction: column;
`;

const RecentPost = styled(Link)`
  height: 50px;
  margin-bottom: 35px;
  overflow: scroll;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-decoration: none;
  color: ${blue.darkest};

  :hover {
    color: ${earth.honey};
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 400px;
  background: transparent;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
`;

function SideBar({ changeFilter }) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopPosts("createdAt")
      .then((data) => {
        setLatestPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const handleClassificationChange = (classification) => {
    changeFilter.setFilter(classification);
  };

  return (
    <SideBarContainer>
      {(location.pathname === "/Posts/Research" ||
        location.pathname === "/Posts/Analysis") && (
        <ClassificationContainer>
          <GeneralBlock
            title={`${
              location.pathname === "/Posts/Research" ? "研究觀點" : "要文評析"
            }分類`}
            postBackgroundColor="rgba(226, 217, 195, 0.7)"
            titleBackgroundColor="rgba(255, 255, 255, 0.6)"
            size="small"
          >
            <ClassificationContent>
              <Classification
                $active={changeFilter.filter === "FinTech"}
                onClick={() => handleClassificationChange("FinTech")}
              >
                金融科技
              </Classification>
              <Classification
                $active={changeFilter.filter === "General"}
                onClick={() => handleClassificationChange("General")}
              >
                一般產業
              </Classification>
              <Classification
                $active={!changeFilter.filter}
                onClick={() => handleClassificationChange(null)}
              >
                全部文章
              </Classification>
            </ClassificationContent>
          </GeneralBlock>
        </ClassificationContainer>
      )}
      {location.pathname === "/Forums" && (
        <ClassificationContainer>
          <GeneralBlock
            title="公眾論壇分類"
            postBackgroundColor="rgba(226, 217, 195, 0.7)"
            titleBackgroundColor="rgba(255, 255, 255, 0.6)"
            size="small"
          >
            <ClassificationContent>
              <Classification
                $active={changeFilter.filter === "PhD"}
                onClick={() => handleClassificationChange("PhD")}
              >
                博士生論壇
              </Classification>
              <Classification
                $active={changeFilter.filter === "News"}
                onClick={() => handleClassificationChange("News")}
              >
                要聞共賞
              </Classification>
              <Classification
                $active={!changeFilter.filter}
                onClick={() => handleClassificationChange(null)}
              >
                全部文章
              </Classification>
            </ClassificationContent>
          </GeneralBlock>
        </ClassificationContainer>
      )}
      {location.pathname !== "/Forums" &&
        location.pathname !== "/Posts/Research" &&
        location.pathname !== "/Posts/Analysis" && (
          <NavListContainer>
            <GeneralBlock
              title="分類清單"
              postBackgroundColor="rgba(226, 217, 195, 0.7)"
              titleBackgroundColor="rgba(255, 255, 255, 0.6)"
              size="small"
            >
              <NavListContent>
                <Nav as={Link} to="/">
                  首頁
                </Nav>
                <Nav as={Link} to="/Posts/Research">
                  研究觀點
                </Nav>
                <Nav as={Link} to="/Posts/Analysis">
                  要聞評析
                </Nav>
                <Nav as={Link} to="/Forums">
                  公眾論壇
                </Nav>
                <Nav as={Link} to="/SpecialThanks">
                  特別感謝
                </Nav>
              </NavListContent>
            </GeneralBlock>
          </NavListContainer>
        )}
      <RecentPosts>
        {error && (
          <ErrorBlock size="small" backgroundColor="rgba(226, 217, 195, 0.7)">
            資料有誤，請稍後再試
          </ErrorBlock>
        )}
        {!error && (
          <GeneralBlock
            title="近期文章"
            postBackgroundColor="rgba(226, 217, 195, 0.7)"
            titleBackgroundColor="rgba(255, 255, 255, 0.6)"
            size="small"
          >
            {isLoading && <Loading>Loading...</Loading>}
            {!isLoading && latestPosts && (
              <RecentPostContent>
                {latestPosts.map((post) => {
                  const category = post.category === "Forum" ? "Forum" : "Post";
                  return (
                    <RecentPost key={post.id} to={`/${category}/${post.id}`}>
                      {post.title}
                    </RecentPost>
                  );
                })}
              </RecentPostContent>
            )}
          </GeneralBlock>
        )}
      </RecentPosts>
    </SideBarContainer>
  );
}

export default memo(SideBar);
