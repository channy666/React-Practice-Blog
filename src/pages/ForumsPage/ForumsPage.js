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

const ForumsContainer = styled.div`
  width: 62vw;
  margin-left: 3vw;
  display: flex;
  flex-direction: column;

  ${MEDIA_QUERY_LG} {
    margin: 0 auto;
    width: 69vw;
  }

  ${MEDIA_QUERY_MD} {
    margin: 0 auto;
    width: 74vw;
  }

  ${MEDIA_QUERY_SM} {
    margin: 0 auto;
    width: 72vw;
  }
`;

const ErrorMessage = styled(ForumsContainer)`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const ForumContainer = styled(Link)`
  margin-bottom: 90px;
  text-decoration: none;
  display: flex;
  border-radius: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.7);
    box-shadow: inset 0px 0px 3px 3px ${white.swan};
  }

  ${MEDIA_QUERY_MD} {
    margin-bottom: 70px;
  }

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    padding: 10px;
    margin-bottom: 50px;
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

  ${MEDIA_QUERY_XL} {
    height: 220px;
  }

  ${MEDIA_QUERY_LG} {
    height: 200px;
    width: 27vw;
  }

  ${MEDIA_QUERY_MD} {
    height: 170px;
    width: 28vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 90%;
    height: 170px;
    margin: 0 auto;
  }
`;

const ForumInfo = styled.div`
  padding: 10px 0px 0px 1vw;

  ${MEDIA_QUERY_XL} {
    padding: 10px 0px 0px 1.5vw;
  }

  ${MEDIA_QUERY_LG} {
    padding: 10px 0px 0px 2vw;
  }

  ${MEDIA_QUERY_MD} {
    padding: 5px 0px 0px 2vw;
  }

  ${MEDIA_QUERY_SM} {
    padding: 5px 0px 0px 0vw;
  }
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

  ${MEDIA_QUERY_XL} {
    font-size: 17px;
  }

  ${MEDIA_QUERY_LG} {
    letter-spacing: 1.2px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 16px;
    padding: 0px 8px;
    height: 36px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 15px;
    height: 34px;
  }
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

  ${MEDIA_QUERY_XL} {
    height: 21px;
    width: 21px;
  }

  ${MEDIA_QUERY_LG} {
    height: 20px;
    width: 20px;
  }

  ${MEDIA_QUERY_MD} {
    height: 19px;
    width: 19px;
  }

  ${MEDIA_QUERY_SM} {
    height: 18px;
    width: 18px;
  }
`;

const ForumTitle = styled.div`
  font-weight: bold;
  font-size: 23px;
  color: ${blue.darker};
  width: 90%;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${MEDIA_QUERY_XL} {
    font-size: 21px;
    width: 95%;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 20px;
    width: 96%;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
    width: 99%;
    line-height: 31px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 17px;
    width: 99%;
    line-height: 28px;
  }
`;

const ForumDetail = styled.div`
  display: flex;
  flex-dorection: column;
  margin-bottom: 30px;
  align-items: center;
  color: ${earth.wood};

  ${MEDIA_QUERY_XL} {
    margin-bottom: 25px;
  }

  ${MEDIA_QUERY_MD} {
    margin-bottom: 13px;
  }

  ${MEDIA_QUERY_SM} {
    margin-bottom: 5px;
  }
`;

const ForumDate = styled.div`
  margin-right: 1vw;
  font-size: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;

  ${MEDIA_QUERY_LG} {
    letter-spacing: 1.5px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 14px;
    letter-spacing: 1.5px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 13px;
    letter-spacing: 1.2px;
    margin-right: 1.5vw;
  }
`;

const ForumDateIcon = styled(ForumStarIcon)`
  margin-right: 10px;
  height: 30px;
  width: 30px;

  ${MEDIA_QUERY_XL} {
    height: 26px;
    width: 26px;
  }

  ${MEDIA_QUERY_LG} {
    height: 25px;
    width: 25px;
  }

  ${MEDIA_QUERY_MD} {
    margin-right: 6px;
    height: 24px;
    width: 24px;
  }

  ${MEDIA_QUERY_SM} {
    height: 20px;
    width: 20px;
    margin-right: 4px;
  }
`;

const ForumAuthor = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;

  ${MEDIA_QUERY_XL} {
    font-size: 15px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 14px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 13px;
  }
`;

const ForumAuthorIcon = styled(ForumStarIcon)`
  height: 30px;
  width: 30px;

  ${MEDIA_QUERY_XL} {
    height: 26px;
    width: 26px;
  }

  ${MEDIA_QUERY_LG} {
    height: 25px;
    width: 25px;
  }

  ${MEDIA_QUERY_MD} {
    height: 24px;
    width: 24px;
    margin-right: 3px;
  }

  ${MEDIA_QUERY_SM} {
    height: 20px;
    width: 20px;
    margin-right: 2px;
  }
`;

const ForumAuthorContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 20vw;

  ${MEDIA_QUERY_LG} {
    width: 23vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 20vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 36vw;
  }
`;

function ForumsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [forums, setForums] = useState();
  const [filter, setFilter] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
        {error && !isLoading && (
          <ErrorMessage>資料有誤，請稍後再試</ErrorMessage>
        )}
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
