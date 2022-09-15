import styled from "styled-components";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/authorization";
import { getMe, deletePost } from "../WebAPI";
import { white, earth } from "../utils/colors";
import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../utils/breakpoints";

const EditPost = styled.div`
  display: flex;
  justify-content: center;
`;

const UpdatePost = styled.div`
  display: flex;
  height: 40px;
  width: 30%;
  cursor: pointer;
  align-items: center;
  color: ${white.beidge};
  justify-content: center;
  border: 1.5px solid ${white.beidge};
  margin-right: 60px;
  letter-spacing: 2px;
  margin-bottom: 30px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
    margin-right: 50px;
  }

  ${MEDIA_QUERY_MD} {
    height: 35px;
    width: 33%;
    margin-right: 40px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    height: 33px;
    width: 35%;
    margin-right: 30px;
  }

  :hover {
    color: ${earth.honey};
    border: 2px solid ${earth.honey};
    font-weight: bold;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    !props.$authorized &&
    `
    display: none;
  `}
`;

const DeletePost = styled(UpdatePost)`
  margin-right: 0;
`;

function EditPostButtons({ postData, userInfo }) {
  const navigate = useNavigate();
  const { user, setUser } = userInfo;

  const handleDeletePost = () => {
    getMe().then((res) => {
      if (!res.ok) {
        setUser(null);
        setAuthToken("");
        return;
      }
      if (
        res.data.id !== postData.user.id &&
        res.data.id !== "032fc50b9d3dac"
      ) {
        return;
      }

      deletePost(postData.id).then((data) => {
        if (postData.category === "Forum") {
          return navigate("/Forums");
        }
        navigate(`/Posts/${postData.category}`);
      });
    });
  };

  const handleUpdatePost = () => {
    getMe().then((res) => {
      if (!res.ok) {
        setUser(null);
        setAuthToken("");
        return;
      }
      if (res.data.id !== postData.user.id) return;
    });

    navigate(`/EditPost/${postData.id}`);
  };

  return (
    <EditPost>
      <UpdatePost
        $authorized={user.id === postData.user.id}
        onClick={handleUpdatePost}
      >
        編輯文章
      </UpdatePost>
      <DeletePost
        $authorized={
          user.id === postData.user.id || user.id === "032fc50b9d3dac"
        }
        onClick={handleDeletePost}
      >
        刪除文章
      </DeletePost>
    </EditPost>
  );
}

export default memo(EditPostButtons);
