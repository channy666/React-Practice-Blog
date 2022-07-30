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

const Root = styled.div`
  display: flex;
  padding: 80px 0px 50px 7vw;
  background: ${white.swan};
`;

const Wrapper = styled.div``;

const PostsContainer = styled.div`
  width: 65vw;
  position: relative;
`;

const Posts = styled.div`
  padding: 50px 3vw 30px 4vw;
`;

const Post = styled(Link)`
  display: flex;
  height: 150px;
  width: 50vw;
  margin-bottom: 30px;
  cursor: pointer;
  text-decoration: none;
  color: ${blue.darkest};
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
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
`;

const PostStarCount = styled(PostDate)`
  width: 5vw;
`;

const PostStarIcon = styled(PostDateIcon)``;

const PostAuthor = styled(PostDate)`
  width: 22vw;
  white-space: nowrap;
`;

const PostAuthorIcon = styled(PostDateIcon)`
  margin-right: 5px;
`;

const Loading = styled.div`
  width: 100%;
  height: 400px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
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
