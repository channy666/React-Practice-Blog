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
    padding: 80px 0px 70px 0px;
  }
`;

const PostContainer = styled.div`
  width: 65vw;
  margin-bottom: 100px;

  ${MEDIA_QUERY_XL} {
    width: 70vw;
    margin-bottom: 80px;
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

const Wrapper = styled.div`
  padding-bottom: 50px;

  ${MEDIA_QUERY_XL} {
    padding-bottom: 20px;
  }

  ${MEDIA_QUERY_MD} {
    padding-bottom: 25px;
  }
`;

const Post = styled.div`
  padding: 30px 0px 40px 3vw;
  width: 95%;
  box-sizing: border-box;

  ${MEDIA_QUERY_XL} {
    padding: 22px 0px 30px 2.5vw;
  }

  ${MEDIA_QUERY_LG} {
    padding: 22px 0px 20px 2.5vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 100%;
  }

  ${MEDIA_QUERY_SM} {
    padding: 22px 0px 20px 3vw;
    width: 100%;
  }
`;

const PostTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  word-break: break-word;
  over-flow: wrap;
  letter-spacing: 1.5px;
  color: ${earth.wood};

  ${MEDIA_QUERY_XL} {
    font-size: 25px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 23px;
    margin-bottom: 22px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 20px;
    margin-bottom: 19px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const PostInfo = styled.div`
  letter-spacing: 1px;
  margin-bottom: 60px;
  font-size: 16px;
  display: flex;
  height: 35px;
  justify-content: space-between;

  ${MEDIA_QUERY_XL} {
    margin-bottom: 50px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
    margin-bottom: 40px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 13px;
    margin-bottom: 35px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 9px;
    margin-bottom: 35px;
  }
`;

const PostInfoLeft = styled.div`
  align-items: center;
  display: flex;
  margin-right: 2vw;

  ${MEDIA_QUERY_XL} {
    margin-right: 1.5vw;
  }

  ${MEDIA_QUERY_MD} {
    margin-right: 1vw;
  }
`;

const PostDate = styled.div`
  flex-shrink: 0;
  height: 100%;
  color: ${earth.wood};
  letter-spacing: 2px;
  display: flex;
  align-items: center;

  ${MEDIA_QUERY_MD} {
    letter-spacing: 1.5px;
  }

  ${MEDIA_QUERY_SM} {
    letter-spacing: 1px;
  }
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

  ${MEDIA_QUERY_LG} {
    height: 21px;
    width: 21px;
  }

  ${MEDIA_QUERY_MD} {
    height: 20px;
    width: 20px;
    margin-right: 6px;
  }

  ${MEDIA_QUERY_SM} {
    height: 16px;
    width: 16px;
    margin-right: 4px;
  }
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

  ${MEDIA_QUERY_XL} {
    width: 33vw;
  }

  ${MEDIA_QUERY_LG} {
    width: 31vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 27vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 22vw;
  }
`;

const PostAuthorIcon = styled(PostDateIcon)`
  margin-right: 5px;

  ${MEDIA_QUERY_MD} {
    margin-right: 2px;
  }

  ${MEDIA_QUERY_SM} {
    margin-right: 1px;
  }
`;

const PostContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 18px;
  letter-spacing: 2px;
  line-height: 35px;
  color: ${blue.darkest};

  img {
    width: 90%;
    height: auto;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 17px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 16px;
    letter-spacing: 1.5px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 30px;
  }

  img {
    width: 90%;
    height: auto;

    ${MEDIA_QUERY_MD} {
      :hover {
        transform: scale(1.25);
      }
    }

    ${MEDIA_QUERY_SM} {
      width: 95%;
    }
  }
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
        if (JSON.stringify(data) === "{}") {
          return setError("postId");
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
