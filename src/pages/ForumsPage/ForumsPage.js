import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../component/SideBar";
import Paginator from "../../component/Paginator";
import { getForums } from "../../WebAPI";
import { white, earth, blue } from "../../utils/colors";
import starIcon from "../../utils/images/star.png";
import dateIcon from "../../utils/images/calendar1.png";
import authorIcon from "../../utils/images/author.png";

const Root = styled.div`
  display: flex;
  padding: 80px 0px 50px 7vw;
  background: ${white.swan};
`;

const ForumsContainer = styled.div`
  width: 62vw;
  margin-left: 3vw;
  display: flex;
  flex-direction: column;
`;

const Error = styled(ForumsContainer)`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const Loading = styled(Error)``;

const ForumContainer = styled(Link)`
  margin-bottom: 90px;
  text-decoration: none;
  display: flex;
  border-radius: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.7);
    box-shadow: inset 0px 0px 3px 3px ${white.swan};
  }
`;

const ForumImage = styled.div`
  background-image: url(${(props) => props.$img});
  height: 250px;
  width: 25vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-shrink: 0;
  box-shadow: inset 0px 0px 5px 5px ${white.swan};
`;

const ForumInfo = styled.div`
  padding: 10px 0px 0px 1vw;
  overflow: auto;
`;

const ForumStarCount = styled.div`
  background: rgba(32, 31, 47, 0.7);
  border-radius: 5px;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 40px;
  display: flex;
  align-items: center;
  color: ${earth.sun};
  font-weight: bold;
  padding: 0px 10px;
  font-size: 18px;
  letter-spacing: 1.5px;
`;

const ForumStarIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 23px;
  width: 23px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  align-self: center;
  margin-right: 5px;
  flex-shrink: 0;
`;

const ForumTitle = styled.div`
  font-weight: bold;
  font-size: 23px;
  color: ${blue.darker};
  width: 90%;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ForumDetail = styled.div`
  display: flex;
  flex-dorection: column;
  margin-bottom: 30px;
  align-items: center;
  color: ${earth.wood};
`;

const ForumDate = styled.div`
  margin-right: 1vw;
  font-size: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
`;

const ForumDateIcon = styled(ForumStarIcon)`
  margin-right: 10px;
  height: 30px;
  width: 30px;
`;

const ForumAuthor = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const ForumAuthorIcon = styled(ForumStarIcon)`
  height: 30px;
  width: 30px;
`;

const ForumAuthorContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 20vw;
`;

function ForumsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [forums, setForums] = useState();
  const [filter, setFilter] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getForums(currentPage, filter)
      .then((res) => {
        const totalPage = Math.ceil(res.headers.get("X-Total-Count") / 5);
        setTotalPage(totalPage);
        if (totalPage < currentPage) {
          setCurrentPage(1);
        }
        return res.json();
      })
      .then((data) => {
        setForums(data);
        window.scrollTo(0, 0);
        setError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, [currentPage, filter]);

  return (
    <Root>
      <SideBar changeFilter={{ filter, setFilter }} />
      <ForumsContainer>
        {error && !isLoading && <Error>資料有誤，請稍後再試</Error>}
        {!error && isLoading && <Loading>Loading...</Loading>}
        {!error &&
          forums &&
          !isLoading &&
          forums.map((forum) => {
            const { id, title, createdAt, user, coverImage, starCount } = forum;
            return (
              <ForumContainer key={id} to={`/Forum/${id}`}>
                <ForumImage $img={coverImage}>
                  <ForumStarCount>
                    <ForumStarIcon $img={starIcon} />
                    {starCount}
                  </ForumStarCount>
                </ForumImage>
                <ForumInfo>
                  <ForumDetail>
                    <ForumDate>
                      <ForumDateIcon $img={dateIcon} />
                      {new Date(Number(createdAt)).toLocaleDateString()}
                    </ForumDate>
                    <ForumAuthor>
                      <ForumAuthorIcon $img={authorIcon} />
                      <ForumAuthorContent>{user.nickname}</ForumAuthorContent>
                    </ForumAuthor>
                  </ForumDetail>
                  <ForumTitle>{title}</ForumTitle>
                </ForumInfo>
              </ForumContainer>
            );
          })}
        {!error && forums && !isLoading && (
          <Paginator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        )}
      </ForumsContainer>
    </Root>
  );
}

export default ForumsPage;
