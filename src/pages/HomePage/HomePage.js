import styled, { keyframes, css } from "styled-components";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GeneralBlock } from "../../component/Blocks";
import { blue, white, earth } from "../../utils/colors";
import { introductionTemplate } from "../../template/homePageTemplate";
import authorIcon from "../../utils/images/author.png";
import starIcon from "../../utils/images/star.png";
import { getTopPosts } from "../../WebAPI";
import Loading from "../../component/Loading";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../utils/breakpoints";

const HomePageContainer = styled.div`
  width: 100%;
  background: ${white.swan};
  padding: 60px 0px;

  ${MEDIA_QUERY_LG} {
    padding: 50px 0px;
  }

  ${MEDIA_QUERY_MD} {
    padding: 40px 0px;
  }

  ${MEDIA_QUERY_SM} {
    padding: 30px 0px;
  }
`;

const IntroductionContainer = styled.div`
  margin: 30px 22vw;
  display: flex;
  flex-direction: column;

  ${MEDIA_QUERY_XL} {
    margin: 30px 17vw;
  }

  ${MEDIA_QUERY_LG} {
    margin: 30px 14vw;
  }

  ${MEDIA_QUERY_MD} {
    margin: 30px 9vw;
  }

  ${MEDIA_QUERY_SM} {
    margin: 30px 0;
  }
`;

const moveLeftToRight = keyframes`
  from {margin-left: -5vw;}
  to {margin-left: 0vw;}

`;

const moveRightToLeft = keyframes`
  from {margin-right: -5vw;}
  to {margin-right: 0vw;}

`;

const Introduction = styled.div`
  height: 450px;
  width: 450px;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 50%;
  border: 7px double ${blue.dark};
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  animation: ${moveLeftToRight} 2s;

  ${(props) =>
    props.$index % 2 === 0 &&
    css`
      align-self: end;
      animation: ${moveRightToLeft} 2s;

      ${MEDIA_QUERY_SM} {
        align-self: center;
      }
    `}

  ${(props) =>
    props.$index > 1 &&
    `
    margin-top: -100px;

    ${MEDIA_QUERY_LG} {
      margin-top: -85px;
    }

    ${MEDIA_QUERY_MD} {
      margin-top: -60px;
    }

    ${MEDIA_QUERY_SM} {
      margin-top: -30px;
    }
  `}

  ${MEDIA_QUERY_LG} {
    height: 420px;
    width: 420px;
  }

  ${MEDIA_QUERY_MD} {
    height: 370px;
    width: 370px;
  }

  ${MEDIA_QUERY_SM} {
    height: 310px;
    width: 310px;
    align-self: center;
  }
`;

const IntroContent = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.$textColor};
`;

const IntroIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 90px;
  width: 90px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-top: 80px;

  ${MEDIA_QUERY_LG} {
    height: 80px;
    width: 80px;
    margin-top: 60px;
  }

  ${MEDIA_QUERY_MD} {
    height: 70px;
    width: 70px;
    margin-top: 55px;
  }

  ${MEDIA_QUERY_SM} {
    height: 60px;
    width: 60px;
    margin-top: 40px;
  }
`;

const IntroTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin: 30px 0px;

  ${MEDIA_QUERY_LG} {
    margin: 25px 0px;
    font-size: 36px;
  }

  ${MEDIA_QUERY_MD} {
    margin: 20px 0px;
    font-size: 32px;
  }

  ${MEDIA_QUERY_SM} {
    margin: 12px 0px;
    font-size: 28px;
  }
`;

const IntroDescription = styled.div`
  font-size: 20px;
  width: 50%;
  line-height: 30px;

  ${MEDIA_QUERY_LG} {
    font-size: 19px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 16px;
  }
`;

const PostRanking = styled.div`
  margin: 150px 10vw 50px 10vw;
  padding-bottom: 100px;

  ${MEDIA_QUERY_XL} {
    margin: 150px 7vw 50px 7vw;
  }

  ${MEDIA_QUERY_LG} {
    margin: 150px 5vw 50px 5vw;
  }
`;

const PostRankingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 10px 30px 10px;
  justify-content: center;
`;

const Post = styled(Link)`
  width: 20vw;
  max-width: 300px;
  min-width: 250px;
  height: 230px;
  border: 4px double ${blue.dark};
  border-radius: 20px;
  padding: 40px 15px 10px 15px;
  margin: 40px 15px 20px 15px;
  background: rgba(255, 255, 255, 0.6);
  text-decoration: none;

  :hover {
    transform: scale(1.05);
  }

  ${MEDIA_QUERY_SM} {
    height: 200px;
  }
`;

const RankContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -72px;
  margin-bottom: 20px;
`;

const RankBackground = styled.div`
  border-radius: 50%;
  background: ${white.white};
  height: 60px;
  width: 60px;
  border: 4px double ${blue.dark};

  ${(props) =>
    props.$rank === 1 &&
    `
    background: gold;
  `}

  ${(props) =>
    props.$rank === 2 &&
    `
    background: silver;
  `}

  ${(props) =>
    props.$rank === 3 &&
    `
    background: ${earth.honey};
  `}
`;

const Rank = styled.div`
  font-weight: bold;
  font-size: 28px;
  position: absolute;
  color: ${blue.darker};
`;

const PostTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding: 0px 10px;
  margin-bottom: 30px;
  overflow: scroll;
  height: 75px;
  color: ${blue.dark};
  line-height: 29px;

  ${MEDIA_QUERY_SM} {
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 20px;
  }
`;

const PostAuthor = styled.div`
  font-size: 18px;
  color: ${earth.wood};
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 0px 10px 10px 10px;
  margin-top: 20px;

  ${MEDIA_QUERY_SM} {
    font-size: 16px;
    margin-top: 10px;
    padding: 0px 10px 8px 10px;
  }
`;

const PostAuthorIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 23px;
  width: 23px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 10px;
  flex-shrink: 0;
`;

const PostAuthorContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
`;

const PostStarCount = styled(PostAuthor)`
  color: ${earth.honey};
  font-weight: bold;
`;

const PostStarIcon = styled(PostAuthorIcon)``;

const ErrorMessage = styled.div`
  width: 100%;
  height: 400px;
  background: transparent;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;

  ${MEDIA_QUERY_MD} {
    font-size: 26px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 24px;
  }
`;

function HomePage() {
  const [postRank, setPostRank] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopPosts("starCount")
      .then((data) => {
        setPostRank(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <HomePageContainer>
      <IntroductionContainer>
        {introductionTemplate.map((intro, index) => {
          const { name, icon, content, backgroundColor, textColor } = intro;
          return (
            <Introduction
              $backgroundColor={backgroundColor}
              $index={index + 1}
              key={index + 1}
            >
              <IntroContent $textColor={textColor}>
                <IntroIcon $img={icon} />
                <IntroTitle>{name}</IntroTitle>
                <IntroDescription>{content}</IntroDescription>
              </IntroContent>
            </Introduction>
          );
        })}
      </IntroductionContainer>
      <PostRanking>
        <GeneralBlock
          title="即時排行"
          postBackgroundColor="rgba(255, 194, 0, 0.2)"
          titleBackgroundColor="rgba(255, 255, 255, 0.6)"
          size="big"
        >
          {error && <ErrorMessage>資料有誤，請稍後再試</ErrorMessage>}
          {!error && isLoading && <Loading>Loading...</Loading>}
          {!error && !isLoading && postRank && (
            <PostRankingContainer>
              {postRank.map((post, index) => {
                const rank = index + 1;
                const category = post.category === "Forum" ? "Forum" : "Post";
                return (
                  <Post key={rank} to={`/${category}/${post.id}`}>
                    <RankContainer>
                      <RankBackground $rank={rank} />
                      <Rank>{rank}</Rank>
                    </RankContainer>
                    <PostTitle>{post.title}</PostTitle>
                    <PostAuthor>
                      <PostAuthorIcon $img={authorIcon} />
                      <PostAuthorContent>
                        {post.user.nickname}
                      </PostAuthorContent>
                    </PostAuthor>
                    <PostStarCount>
                      <PostStarIcon $img={starIcon} />
                      {post.starCount}
                    </PostStarCount>
                  </Post>
                );
              })}
            </PostRankingContainer>
          )}
        </GeneralBlock>
      </PostRanking>
    </HomePageContainer>
  );
}

export default memo(HomePage);
