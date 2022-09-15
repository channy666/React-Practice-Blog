import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { blue, white, earth } from "../utils/colors";
import starIcon from "../utils/images/star.png";
import { updatePost } from "../WebAPI";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../utils/breakpoints";

const StarButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  ${MEDIA_QUERY_XL} {
    margin-top: 10px;
  }

  ${MEDIA_QUERY_MD} {
    margin-top: 30px;
  }

  ${MEDIA_QUERY_SM} {
    margin-top: 15px;
  }
`;

const StarDescription = styled.div`
  color: ${earth.wood};
  margin: 30px 0px 40px 0px;
  font-size: 16px;

  ${MEDIA_QUERY_XL} {
    font-size: 16px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
    margin: 20px 0px 30px 0px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 15px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    margin: 10px 10px 30px 10px;
  }
`;

const StarCount = styled.div`
  display: flex;
  border: 1px dashed ${blue.dark};
  font-weight: bold;
  border: 1px solid rgba(60, 63, 78, 0.1);
  box-shadow: 6px 8px 2px #999;
  color: ${earth.wood};
  height: 50px;
  min-width: 100px;
  border-radius: 5px;
  padding: 12px;
  box-sizing: border-box;
  letter-spacing: 1.5px;
  font-size: 22px;
  align-items: center;
  cursor: pointer;
  background: ${white.white};

  ${MEDIA_QUERY_MD} {
    font-size: 20px;
    height: 45px;
    padding: 10px;
  }

  :hover {
    border: 1.5px solid ${earth.honey};
  }

  ${(props) =>
    props.$clicked &&
    `
    box-shadow: 3px 5px 2px #666;
    transform: translateY(4px);
    color: ${earth.honey};
    font-size: 24px;
    border: 1.5px solid ${earth.honey};

    ${MEDIA_QUERY_MD} {
      font-size: 22px;
    }

    & :first-child {
      transform: rotate(360deg);
      transition: all 1.5s;
    }
  `}

  ${(props) =>
    !props.$user &&
    `
    box-shadow: none;
    cursor: default;
  `}
`;

const StarIcon = styled.div`
  background-image: url(${(props) => props.$img});
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  align-self: center;
  margin-right: 10px;
  z-index: 3;

  ${MEDIA_QUERY_MD} {
    height: 25px;
    width: 25px;
    margin-right: 7px;
  }
`;

const StarReminder = styled(StarDescription)`
  ${(props) =>
    !props.$display &&
    `
    visibility: hidden;
  `}
  a {
    color: ${earth.honey};
    font-weight: bold;

    :hover {
      color: ${earth.chocolate};
    }
  }
`;

function StarButton({ starInfo, user, postId }) {
  const { star, setStar, starRef } = starInfo;
  const [reminder, setReminder] = useState(false);
  const location = useLocation();

  useEffect(() => {
    starRef.current = {
      ...starRef.current,
      currentCount: star.count,
    };
  }, [star, starRef]);

  useEffect(() => {
    return () => {
      let { initialCount, currentCount, userId } = starRef.current;
      if (initialCount === currentCount) return;

      if (initialCount < currentCount) {
        userId.push(user.id);
      } else {
        userId = userId.filter((id) => id !== user.id);
      }

      const newStarInfo = {
        starCount: currentCount,
        starUserId: userId,
      };

      updatePost(postId, newStarInfo);
    };
  }, [location.pathname, starRef, user, postId]);

  const handleButtonClick = useCallback(() => {
    if (!user) return setReminder(true);

    setStar((prevState) => {
      return {
        ...prevState,
        count: prevState.clicked ? prevState.count - 1 : prevState.count + 1,
        clicked: !prevState.clicked,
      };
    });
  }, [user]);

  return (
    <StarButtonContainer>
      <StarDescription>
        喜歡本篇文章嗎？別忘了按下星星給予作者支持喔！
      </StarDescription>
      <StarCount
        $clicked={star.clicked}
        onClick={handleButtonClick}
        $user={user}
      >
        <StarIcon $img={starIcon} />
        {star.count}
      </StarCount>
      <StarReminder $display={reminder}>
        {"請先 "}
        <Link to="/Login" state={location.pathname}>
          註冊 / 登入
        </Link>
        ！
      </StarReminder>
    </StarButtonContainer>
  );
}

export default StarButton;
