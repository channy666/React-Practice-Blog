import { useState, useEffect, memo, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import EditPostButtons from "../../component/EditPostButtons";
import sort from "../../utils/sortPost";
import { getPost } from "../../WebAPI";
import { AuthContext } from "../../context";
import { white, earth, blue } from "../../utils/colors";
import authorIcon from "../../utils/images/author.png";
import starIcon from "../../utils/images/star.png";
import dateIcon from "../../utils/images/calendar1.png";
import StarButton from "../../component/StarButton";

const Root = styled.div`
  display: flex;
  padding: 80px 0px 50px 7vw;
  background: ${white.swan};
`;

const Wrapper = styled.div`
  padding-bottom: 50px;
`;

const PostContainer = styled.div`
  width: 65vw;
  margin-bottom: 100px;
`;

const Post = styled.div`
  padding: 30px 0px 40px 3vw;
  width: 95%;
  box-sizing: border-box;
`;

const PostTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #391d46;
  word-break: break-word;
  over-flow: wrap;
  letter-spacing: 1.5px;
  color: ${earth.wood};
`;

const PostInfo = styled.div`
  letter-spacing: 1px;
  margin-bottom: 60px;
  font-size: 16px;
  display: flex;
  height: 35px;
  justify-content: space-between;
`;

const PostInfoLeft = styled.div`
  align-items: center;
  display: flex;
  margin-right: 2vw;
`;

const PostDate = styled.div`
  flex-shrink: 0;
  height: 100%;
  color: ${earth.wood};
  letter-spacing: 2px;
  display: flex;
  align-items: center;
`;

const PostDateIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 23px;
  width: 23px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  align-self: center;
  margin-right: 8px;
`;

const PostAuthor = styled.div`
  height: 30px;
  display: flex;
  margin-left: 1vw;
  align-items: center;
`;

const PostAuthorContent = styled.div`
  color: ${earth.wood};
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 35vw;
`;

const PostAuthorIcon = styled(PostDateIcon)``;

const PostContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 18px;
  letter-spacing: 2px;
  line-height: 35px;
  color: ${blue.darkest};
`;

const PostStarCount = styled(PostDate)`
  ${(props) =>
    props.$starClicked &&
    `
    color: ${earth.honey};
    font-weight: bold;
  `}
`;

const PostStarIcon = styled(PostDateIcon)``;

const Loading = styled.div`
  width: 100%;
  height: 400px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
`;

function PostPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState();
  const { user, setUser } = useContext(AuthContext);
  const [star, setStar] = useState({});
  const starRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPost(id)
      .then((data) => {
        // 找不到資料會回傳空物件
        if (JSON.stringify(data) === "{}") {
          setError("postId");
          return;
        }
        if (data.category !== "Research" && data.category !== "Analysis") {
          return navigate(`/Forum/${data.id}`);
        }
        setPostData(data);
        setStar((prevState) => {
          return {
            ...prevState,
            count: data.starCount,
            clicked: user
              ? data.starUserId.some((id) => id === user.id)
              : false,
          };
        });
        starRef.current = {
          initialCount: data.starCount,
          userId: data.starUserId,
          currentCount: data.starCount,
        };
        window.scrollTo(0, 0);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("API");
      });
  }, [id, user]);

  return (
    <Root>
      <SideBar />
      <PostContainer>
        {error && (
          <ErrorBlock backgroundColor="rgba(255, 255, 255, 0.7)">
            {error === "postId" ? "找不到文章" : "資料錯誤，請稍後再試"}
          </ErrorBlock>
        )}
        {!error && (
          <Wrapper>
            {isLoading && (
              <GeneralBlock
                title=""
                postBackgroundColor="rgba(255, 255, 255, 0.7)"
                titleBackgroundColor="transparent"
              >
                <Loading>Loading...</Loading>
              </GeneralBlock>
            )}
            {!isLoading && postData && (
              <GeneralBlock
                title={`${sort.categoryName[postData.category]} > ${
                  sort.classificationName[postData.classification]
                }`}
                postBackgroundColor="rgba(255, 255, 255, 0.7)"
                titleBackgroundColor="rgba(226,217,195,0.35)"
              >
                <Wrapper>
                  <Post>
                    {user && (
                      <EditPostButtons
                        postData={postData}
                        userInfo={{ user, setUser }}
                      />
                    )}
                    <PostTitle>{postData.title}</PostTitle>
                    <PostInfo>
                      <PostInfoLeft>
                        <PostDate>
                          <PostDateIcon $img={dateIcon} />
                          {new Date(
                            Number(postData.createdAt)
                          ).toLocaleDateString()}
                        </PostDate>
                        <PostAuthor>
                          <PostAuthorIcon $img={authorIcon} />
                          <PostAuthorContent>
                            {postData.user.nickname}
                          </PostAuthorContent>
                        </PostAuthor>
                      </PostInfoLeft>
                      <PostStarCount $starClicked={star.clicked}>
                        <PostStarIcon $img={starIcon} />
                        {star.count}
                      </PostStarCount>
                    </PostInfo>
                    <PostContent>
                      {parse(DOMPurify.sanitize(postData.body))}
                    </PostContent>
                  </Post>
                  <StarButton
                    starInfo={{ star, setStar, starRef }}
                    user={user}
                    postId={id}
                  />
                </Wrapper>
              </GeneralBlock>
            )}
          </Wrapper>
        )}
      </PostContainer>
    </Root>
  );
}

export default memo(PostPage);
