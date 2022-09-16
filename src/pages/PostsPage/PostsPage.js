import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import { getPosts } from "../../WebAPI";
import Paginator from "../../component/Paginator";
import sort from "../../utils/sortPost";
import { white, blue, earth } from "../../utils/colors";
import dateIcon from "../../utils/images/calendar1.png";
import starIcon from "../../utils/images/star.png";
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

const Wrapper = styled.div``;

const PostsContainer = styled.div`
  width: 65vw;

  ${MEDIA_QUERY_XL} {
    width: 70vw;
  }

  ${MEDIA_QUERY_LG} {
    margin: 0 auto;
    width: 75vw;
  }

  ${MEDIA_QUERY_MD} {
    margin: 0 auto;
    width: 80vw;
  }

  ${MEDIA_QUERY_SM} {
    margin: 0 auto;
    width: 85vw;
  }
`;

const Posts = styled.div`
  padding: 30px 3vw 30px 2.5vw;
`;

const Post = styled(Link)`
  display: flex;
  width: 50vw;
  margin-bottom: 50px;
  cursor: pointer;
  text-decoration: none;
  color: ${blue.darkest};
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;

  ${MEDIA_QUERY_XL} {
    width: 52vw;
  }

  ${MEDIA_QUERY_LG} {
    width: 55vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 58vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 65vw;
    padding: 10px 8px;
  }
`;

const PostTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  width: 50vw;
  line-height: 35px;
  display: flex;
  margin-bottom: 15px;

  :hover {
    text-decoration: underline;
    color: ${earth.chocolate};
  }

  ${MEDIA_QUERY_XL} {
    width: 53vw;
  }

  ${MEDIA_QUERY_LG} {
    width: 55vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 59vw;
    font-size: 20px;
  }

  ${MEDIA_QUERY_SM} {
    width: 66vw;
    font-size: 18px;
  }
`;

const PostInfo = styled.div`
  display: flex;
  overflow: scroll;
`;

const PostDateIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 25px;
  width: 25px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  align-self: center;
  margin-right: 10px;
  flex-shrink: 0;

  ${MEDIA_QUERY_SM} {
    height: 20px;
    width: 20px;
    margin-right: 8px;
  }
`;

const PostDate = styled.div`
  font-size: 15px;
  width: 8vw;
  display: flex;
  align-self: center;
  align-items: center;
  letter-spacing: 1.5px;
  color: ${earth.wood};
  margin-right: 3vw;
  flex-shrink: 0;

  ${MEDIA_QUERY_XL} {
    width: 10vw;
  }

  ${MEDIA_QUERY_LG} {
    width: 14vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 20vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 105px;
    font-size: 13px;
  }
`;

const PostStarCount = styled(PostDate)`
  width: 5vw;

  ${MEDIA_QUERY_XL} {
    width: 6vw;
  }

  ${MEDIA_QUERY_LG} {
    width: 9vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 12vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 65px;
  }
`;

const PostStarIcon = styled(PostDateIcon)`
  margin-right: 8px;

  ${MEDIA_QUERY_SM} {
    margin-right: 5px;
  }
`;

const PostAuthor = styled(PostDate)`
  white-space: nowrap;
  width: auto;

  ${MEDIA_QUERY_SM} {
    font-size: 13px;
  }
`;

const PostAuthorIcon = styled(PostDateIcon)`
  margin-right: 5px;

  ${MEDIA_QUERY_SM} {
    margin-right: 3px;
  }
`;

function PostsPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(null);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setFilter(null);
    if (category !== "Research" && category !== "Analysis") {
      navigate("/NotFound");
    }
  }, [category]);

  useEffect(() => {
    setIsLoading(true);
    getPosts(currentPage, category, filter)
      .then((res) => {
        const totalPage = Math.ceil(res.headers.get("X-Total-Count") / 10);
        setTotalPage(totalPage);
        if (totalPage < currentPage) {
          setCurrentPage(1);
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        window.scrollTo(0, 0);
        setError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [currentPage, category, filter]);

  return (
    <Root>
      <SideBar changeFilter={{ filter, setFilter }} />
      <PostsContainer>
        {error && !isLoading && (
          <ErrorBlock backgroundColor="rgba(240, 152, 0, 0.1)">
            資料有誤，請稍後再試
          </ErrorBlock>
        )}
        {!error && (
          <Wrapper>
            <GeneralBlock
              title={
                filter
                  ? `${sort.categoryName[category]} > ${sort.classificationName[filter]}`
                  : sort.categoryName[category]
              }
              postBackgroundColor="rgba(240, 152, 0, 0.1)"
              titleBackgroundColor="rgba(255, 255, 255, 0.6)"
            >
              {isLoading && <Loading>Loading...</Loading>}
              {posts && !isLoading && (
                <Posts>
                  {posts.map((post) => (
                    <Post key={post.id} to={`/Post/${post.id}`}>
                      <PostTitle>{post.title}</PostTitle>
                      <PostInfo>
                        <PostDate>
                          <PostDateIcon $img={dateIcon} />
                          {new Date(
                            Number(post.createdAt)
                          ).toLocaleDateString()}
                        </PostDate>
                        <PostStarCount>
                          <PostStarIcon $img={starIcon} />
                          {post.starCount}
                        </PostStarCount>
                        <PostAuthor>
                          <PostAuthorIcon $img={authorIcon} />
                          {post.user.nickname}
                        </PostAuthor>
                      </PostInfo>
                    </Post>
                  ))}
                </Posts>
              )}
            </GeneralBlock>
            {posts && !isLoading && (
              <Paginator
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            )}
          </Wrapper>
        )}
      </PostsContainer>
    </Root>
  );
}

export default PostsPage;
