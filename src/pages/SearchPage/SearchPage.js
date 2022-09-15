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
import Loading from "../../component/Loading";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../utils/breakpoints";

const Root = styled.div`
  display: flex;
  padding: 80px 0px 50px 7vw;
  background: ${white.swan};
  position: relative;

  ${MEDIA_QUERY_XL} {
    padding: 80px 0px 50px 5vw;
  }

  ${MEDIA_QUERY_LG} {
    padding: 80px 0px 50px 0px;
  }
`;

const SearchResultsContainer = styled.div`
  width: 65vw;
  min-height: 300px;

  ${MEDIA_QUERY_XL} {
    width: 70vw;
  }

  ${MEDIA_QUERY_LG} {
    margin: 0 auto;
    width: 78vw;
  }

  ${MEDIA_QUERY_MD} {
    margin: 0 auto;
    width: 82vw;
  }

  ${MEDIA_QUERY_SM} {
    margin: 0 auto;
    width: 90vw;
  }
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
    background: rgba(255, 255, 255, 0.9);
  }

  ${MEDIA_QUERY_XL} {
    width: 48vw;
    font-size: 14px;
  }

  ${MEDIA_QUERY_LG} {
    width: 55vw;
    font-size: 13px;
    padding: 15px 4vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 58vw;
    font-size: 12px;
    margin: 30px auto;
    padding: 13px 4vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 63vw;
    font-size: 10px;
    margin: 30px auto;
    padding: 10px 4vw;
  }
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

  ${MEDIA_QUERY_LG} {
    margin-right: 1.5vw;
  }

  ${MEDIA_QUERY_MD} {
    margin-right: 1.5vw;
    letter-spacing: 1px;
  }

  ${MEDIA_QUERY_SM} {
    margin-right: 2.5vw;
    letter-spacing: 0.8px;
  }
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

  ${MEDIA_QUERY_XL} {
    height: 23px;
    width: 23px;
  }

  ${MEDIA_QUERY_LG} {
    height: 21px;
    width: 21px;
  }

  ${MEDIA_QUERY_MD} {
    height: 19px;
    width: 19px;
  }

  ${MEDIA_QUERY_SM} {
    height: 17px;
    width: 17px;
  }
`;

const PostCategory = styled(PostDate)``;

const PostStarCount = styled(PostDate)``;

const PostAuthor = styled(PostDate)``;

const PostTitle = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0px;
  align-items: center;

  ${MEDIA_QUERY_XL} {
    font-size: 22px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 20px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
    padding: 7px 0px 5px 0px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 16px;
    padding: 7px 0px 4px 0px;
  }
`;

function SearchPage() {
  const { searchValue } = useParams();
  const [searchResult, setSearchResult] = useState();
  const [searchResultTotalCount, setSearchResultTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSearching(true);
    getSearchPost(searchValue, currentPage)
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
  }, [searchValue, currentPage]);

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
            <Loading>Searching...</Loading>
          </GeneralBlock>
        )}
        {!error && !isSearching && searchResult && (
          <GeneralBlock
            title={`搜尋含有「 ${searchValue} 」的文章，共 ${searchResultTotalCount} 筆`}
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
