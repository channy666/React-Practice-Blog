import styled from "styled-components";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../component/SideBar";
import EditPostButtons from "../../component/EditPostButtons";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { getPost } from "../../WebAPI";
import { AuthContext } from "../../context";
import { white, blue, earth } from "../../utils/colors";
import starIcon from "../../utils/images/star.png";
import authorIcon from "../../utils/images/author.png";
import dateIcon from "../../utils/images/calendar1.png";
import StarButton from "../../component/StarButton";

const Root = styled.div`
  display: flex;
  padding: 80px 0px 50px 7vw;
  background: ${white.swan};
`;

const ForumContainer = styled.div`
  width: 55vw;
  margin: 0 0 10vh 4vw;
`;

const Reminder = styled(ForumContainer)`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const ForumTitle = styled.div`
  font-weight: bold;
  font-size: 32px;
  color: ${earth.wood};
`;

const ForumInfo = styled.div`
  display: flex;
  margin: 20px 0px 35px 0px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  color: ${earth.wood};
`;

const ForumInfoRight = styled.div`
  display: flex;
`;

const ForumDate = styled.div`
  margin-right: 4%;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
`;

const ForumDateIcon = styled.div`
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

const ForumAuthor = styled.div`
  color: ${earth.wood};
  display: flex;
  align-items: center;
`;

const ForumAuthorIcon = styled(ForumDateIcon)`
  margin-right: 5px;
`;

const ForumAuthorContent = styled.div`
  color: ${earth.wood};
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 35vw;
`;

const ForumStarCount = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1vw;
  letter-spacing: 1.5px;
  padding: 8px 10px;
  border-radius: 5px;

  ${(props) =>
    props.$starClicked &&
    `
    color: ${earth.honey};
    font-weight: bold;
  `}
`;

const ForumStarIcon = styled(ForumDateIcon)``;

const ForumImage = styled.div`
  background-image: url(${(props) => props.$img});
  height: 35vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: inset 0px 0px 5px 5px ${white.swan};
`;

const ForumContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  margin: 5vh 0;
  line-height: 30px;
  letter-spacing: 1.2px;
  color: ${blue.darkest};
`;

function ForumPage() {
  const { id } = useParams();
  const [forumData, setForumData] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [star, setStar] = useState({});
  const starRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    getPost(id)
      .then((data) => {
        if (JSON.stringify(data) === "{}") {
          return setError(true);
        }
        if (data.category !== "Forum") {
          return navigate(`/Post/${data.id}`);
        }
        setForumData(data);
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
        setError(true);
        console.log(err);
      });
  }, [id, user]);

  return (
    <Root>
      <SideBar />
      {error && <Reminder>資料有誤，請稍後再試</Reminder>}
      {isLoading && !error && <Reminder>Loading...</Reminder>}
      {!error && !isLoading && forumData && (
        <ForumContainer>
          {user && (
            <EditPostButtons
              postData={forumData}
              userInfo={{ user, setUser }}
            />
          )}
          <ForumTitle>{forumData.title}</ForumTitle>
          <ForumInfo>
            <ForumInfoRight>
              <ForumDate>
                <ForumDateIcon $img={dateIcon} />
                {new Date(forumData.createdAt).toLocaleDateString()}
              </ForumDate>
              <ForumAuthor>
                <ForumAuthorIcon $img={authorIcon} />
                <ForumAuthorContent>
                  {forumData.user.nickname}
                </ForumAuthorContent>
              </ForumAuthor>
            </ForumInfoRight>
            <ForumStarCount $starClicked={star.clicked}>
              <ForumStarIcon $img={starIcon} />
              {star.count}
            </ForumStarCount>
          </ForumInfo>
          {forumData.coverImage && <ForumImage $img={forumData.coverImage} />}
          <ForumContent>
            {parse(DOMPurify.sanitize(forumData.body))}
          </ForumContent>
          <StarButton
            starInfo={{ star, setStar, starRef }}
            user={user}
            postId={id}
          />
        </ForumContainer>
      )}
    </Root>
  );
}

export default ForumPage;
