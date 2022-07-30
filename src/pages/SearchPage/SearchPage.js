import { useEffect, useState, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import Paginator from "../../component/Paginator";
import sort from "../../utils/sortPost";
import { getSearchPost } from "../../WebAPI";
import { blue, white, earth } from "../../utils/colors";
import dateIcon from "../../utils/images/calendar1.png";
import starIcon from "../../utils/images/star.png";
import logo from "../../utils/images/LOGO.png";
import authorIcon from "../../utils/images/author.png";

const Root = styled.div`
  display: flex;
  padding: 80px 0px 50px 7vw;
  background: ${white.swan};
`;

const SearchResultsContainer = styled.div`
  width: 65vw;
  position: relative;
`;

const SearchResults = styled.div``;

const Post = styled.div`
  text-decoration: none;
  color: ${blue.darkest};
  width: 45vw;
  padding: 20px 4vw;
  margin: 35px auto;
  cursor: pointer;
  margin-bottom: 50px;
  border: 1px solid rgba(60, 63, 78, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 15px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  :hover {
    color: ${earth.chocolate};
    background: rgba(255, 255, 255, 0.8);

`;

const PostInfo = styled.div`
  display: flex;
  margin-top: 10px;
  overflow: auto;
  padding-bottom: 10px;
`;

const PostDate = styled.div`
  display: flex;
  align-items: center;
  letter-spacing: 1.5px;
  flex-shrink: 0;
  margin-right: 1vw;
`;

const PostInfoIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 25px;
  width: 25px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  align-self: center;
  margin-right: 5px;
  flex-shrink: 0;
`;

const PostCategory = styled(PostDate)``;

const PostStarCount = styled(PostDate)``;

const PostAuthor = styled(PostDate)``;

const PostTitle = styled.div`
  display: flex;
  font-size: 26px;
  font-weight: bold;
  padding: 10px 0px;
  align-items: center;
`;

const Searching = styled.div`
  width: 100%;
  height: 400px;
  background: transparent;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
`;

function SearchPage() {
  const { value } = useParams();
  const [searchResult, setSearchResult] = useState();
  const [searchResultTotalCount, setSearchResultTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSearchPost(value, currentPage)
      .then((res) => {
        const totalCount = res.headers.get("X-Total-Count");
        setSearchResultTotalCount(totalCount);
        if (!totalCount) {
          setTotalPage(1);
        } else {
          setTotalPage(Math.ceil(totalCount / 10));
        }
        if (Math.ceil(totalCount / 10) < currentPage) {
          setCurrentPage(1);
        }
        return res.json();
      })
      .then((data) => {
        setSearchResult(data);
        setIsSearching(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        setError(true);
        setIsSearching(false);
      });
  }, [value, currentPage]);

  const handlePostClick = useCallback((pathname) => {
    navigate(pathname);
  }, []);

  return (
    <Root>
      <SideBar />
      <SearchResultsContainer>
        {error && (
          <ErrorBlock backgroundColor="rgba(226, 217, 195, 0.7)">
            資料有誤，請稍後再試
          </ErrorBlock>
        )}
        {!error && isSearching && (
          <GeneralBlock
            title=""
            full={true}
            postBackgroundColor="rgba(226, 217, 195, 0.7)"
            titleBackgroundColor="rgba(255, 255, 255, 0.6)"
          >
            <Searching>Searching...</Searching>
          </GeneralBlock>
        )}
        {!error && !isSearching && searchResult && (
          <GeneralBlock
            title={`搜尋含有「 ${value} 」的文章，共 ${searchResultTotalCount} 筆`}
            postBackgroundColor="rgba(226, 217, 195, 0.7)"
            titleBackgroundColor="rgba(255, 255, 255, 0.6)"
          >
            <SearchResults>
              {searchResult.map((post) => {
                let route = "";
                if (post.category === "Forum") {
                  route = "/Forum";
                } else {
                  route = "/Post";
                }
                return (
                  <Post
                    key={post.id}
                    to={`${route}/${post.id}`}
                    onClick={() => {
                      handlePostClick(`${route}/${post.id}`);
                    }}
                  >
                    <PostTitle>{post.title}</PostTitle>
                    <PostInfo>
                      <PostDate>
                        <PostInfoIcon $img={dateIcon} />
                        {new Date(Number(post.createdAt)).toLocaleDateString()}
                      </PostDate>
                      <PostCategory>
                        <PostInfoIcon $img={logo} />
                        {`${sort.categoryName[post.category]} > ${
                          sort.classificationName[post.classification]
                        }`}
                      </PostCategory>
                      <PostStarCount>
                        <PostInfoIcon $img={starIcon} />
                        {post.starCount}
                      </PostStarCount>
                      <PostAuthor>
                        <PostInfoIcon $img={authorIcon} />
                        {post.user.nickname}
                      </PostAuthor>
                    </PostInfo>
                  </Post>
                );
              })}
            </SearchResults>
          </GeneralBlock>
        )}
        {!error && !isSearching && searchResult && (
          <Paginator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        )}
      </SearchResultsContainer>
    </Root>
  );
}

export default memo(SearchPage);
