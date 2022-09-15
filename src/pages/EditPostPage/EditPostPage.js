import styled from "styled-components";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SideBar from "../../component/SideBar";
import { GeneralBlock } from "../../component/Blocks";
import { AuthContext } from "../../context";
import { updatePost, getPost } from "../../WebAPI";
import { getAuthToken, setAuthToken } from "../../utils/authorization";
import { blue, white } from "../../utils/colors";
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
    padding: 80px 0px;
  }
`;

const CreatePostContainer = styled.div`
  width: 66vw;
  margin-bottom: 60px;

  ${MEDIA_QUERY_XL} {
    width: 70vw;
  }

  ${MEDIA_QUERY_LG} {
    margin: 0 auto;
    width: 80vw;
  }

  ${MEDIA_QUERY_MD} {
    margin: 0 auto;
    width: 84vw;
  }

  ${MEDIA_QUERY_SM} {
    margin: 0 auto;
    width: 91vw;
  }
`;

const CreatePost = styled.div`
  padding: 40px 5% 30px 6%;
  width: 90%;

  ${MEDIA_QUERY_XL} {
    padding: 35px 5% 30px 5%;
    width: 93%;
  }

  ${MEDIA_QUERY_LG} {
    padding: 30px 5% 30px 5%;
    width: 95%;
  }

  ${MEDIA_QUERY_MD} {
    padding: 25px 5% 30px 5%;
    width: 96%;
  }

  ${MEDIA_QUERY_SM} {
    padding: 25px 3% 30px 3%;
    width: 99%;
  }
`;

const PostTitle = styled.div`
  width: 90%;
  height: 40px;
  margin-bottom: 40px;

  ${MEDIA_QUERY_XL} {
    margin-bottom: 35px;
  }

  ${MEDIA_QUERY_LG} {
    height: 35px;
  }

  ${MEDIA_QUERY_MD} {
    height: 32px;
    margin-bottom: 30px;
  }

  ${MEDIA_QUERY_SM} {
    height: 30px;
    margin-bottom: 25px;
  }

  input {
    height: 100%;
    width: 100%;
    font-size: 17px;
    border: 1px solid rgba(60, 63, 78, 0.2);

    ${MEDIA_QUERY_LG} {
      font-size: 16px;
    }

    ${MEDIA_QUERY_MD} {
      font-size: 15px;
    }

    ${MEDIA_QUERY_SM} {
      font-size: 14px;
    }

    ::placeholder {
      color: #757575;
    }
  }
`;

const PostCatagory = styled.div`
  margin-bottom: 40px;

  ${MEDIA_QUERY_XL} {
    margin-bottom: 35px;
  }

  ${MEDIA_QUERY_MD} {
    margin-bottom: 30px;
  }

  ${MEDIA_QUERY_SM} {
    margin-bottom: 25px;
  }

  select {
    height: 40px;
    font-size: 17px;
    color: #757575;
    border: 1px solid rgba(60, 63, 78, 0.2);
    margin-right: 40px;

    ${MEDIA_QUERY_XL} {
      margin-right: 35px;
    }

    ${MEDIA_QUERY_LG} {
      margin-right: 30px;
      font-size: 16px;
      height: 35px;
    }

    ${MEDIA_QUERY_MD} {
      margin-right: 25px;
      font-size: 15px;
      height: 32px;
    }

    ${MEDIA_QUERY_SM} {
      font-size: 14px;
      height: 30px;
    }

    option:not(first-child) {
      color: ${blue.dark};
    }
  }
`;

const SubmitButton = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  color: ${blue.darker};
  border-radius: 3px;
  width: 7vw;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 8px;
  font-weight: bold;
  height: 50px;
  padding-left: 8px;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(60, 63, 78, 0.2);

  :hover {
    background: ${white.beidge};
    border: none;
  }

  ${MEDIA_QUERY_XL} {
    width: 9vw;
  }

  ${MEDIA_QUERY_LG} {
    width: 11vw;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 17px;
    width: 13vw;
    height: 45px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 16px;
    width: 19vw;
    height: 40px;
  }
`;

const CKEditorContainer = styled.div`
  width: 53vw;
  margin-bottom: 60px;
  font-size: 17px;

  ${MEDIA_QUERY_XL} {
    width: 56vw;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 16px;
    width: 63vw;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 15px;
    width: 65vw;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    width: 71vw;
  }

  .ck-editor {
    .ck-editor__main {
      .ck-content {
        height: 700px;

        ${MEDIA_QUERY_XL} {
          height: 650px;
        }

        ${MEDIA_QUERY_LG} {
          height: 600px;
        }

        ${MEDIA_QUERY_MD} {
          height: 550px;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: Red;
  margin-bottom: 8px;
  font-weight: bold;

  ${MEDIA_QUERY_XL} {
    font-size: 15px;
    margin-bottom: 6px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 14px;
    margin-bottom: 5px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 13px;
    margin-bottom: 3px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 12px;
    margin-bottom: 2px;
  }
`;

function EditPostPage() {
  const editorDataRef = useRef();
  const authorRef = useRef();
  const scrollIntoViewRef = useRef();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [category, setCategory] = useState("");
  const [classification, setClassification] = useState("");
  const [content, setContent] = useState("");
  const { user, setUser, isConfirmingUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConfirmingUser) return;
    if (!getAuthToken() || !user) {
      setUser(null);
      setAuthToken("");
      navigate("/");
    }
  }, [user, isConfirmingUser]);

  useEffect(() => {
    if (isConfirmingUser) return;
    getPost(id).then((data) => {
      authorRef.current = data.user.id;
      if (data.user.id !== user.id) {
        setErrorMessage("您沒有編輯文章的權限！");
        return;
      }

      setTitle(data.title);
      setCategory(data.category);
      setClassification(data.classification);
      setContent(data.body);
    });
  }, [isConfirmingUser, id, user]);

  const handleSubmitUpdatePost = () => {
    setErrorMessage(null);

    if (
      !title ||
      !editorDataRef.current.getData() ||
      !category ||
      !classification
    ) {
      setErrorMessage("標題、分類與內文皆不可為空");
      scrollIntoViewRef.current.scrollIntoView();
      return;
    }

    if (authorRef.current !== user.id) {
      setErrorMessage("您沒有編輯文章的權限！");
      scrollIntoViewRef.current.scrollIntoView();
      return;
    }

    const newPostData = {
      title,
      body: content,
      category,
      classification,
    };

    updatePost(id, newPostData)
      .then((data) => {
        if (data.id) {
          if (data.category === "Forum") {
            return navigate(`/Forum/${data.id}`);
          }
          navigate(`/Post/${data.id}`);
        }
      })
      .catch((err) => {
        setErrorMessage("伺服器錯誤，請稍後再試");
        scrollIntoViewRef.current.scrollIntoView();
      });
  };

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setErrorMessage(false);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const handleClassificationChange = useCallback((e) => {
    setClassification(e.target.value);
  }, []);

  const handleContentChange = (event, editor) => {
    setContent(editor.getData());
  };

  return (
    <Root>
      <SideBar />
      <CreatePostContainer>
        <GeneralBlock
          title="更新文章"
          postBackgroundColor="rgba(255, 255, 255, 0.5)"
          titleBackgroundColor={white.swan}
        >
          <CreatePost ref={scrollIntoViewRef}>
            <PostTitle>
              <input
                placeholder=" 請輸入文章標題"
                onChange={handleTitleChange}
                value={title}
                onFocus={handleFocus}
              />
            </PostTitle>
            <PostCatagory>
              <select
                onChange={handleCategoryChange}
                onFocus={handleFocus}
                value={category}
              >
                <option value="Research">研究觀點</option>
                <option value="Analysis">要文評析</option>
                <option value="Forum">公眾論壇</option>
              </select>
              {(category === "Research" || category === "Analysis") && (
                <select
                  onChange={handleClassificationChange}
                  onFocus={handleFocus}
                  value={classification}
                >
                  <option value="FinTech">金融科技</option>
                  <option value="General">一般產業</option>
                </select>
              )}
              {category === "Forum" && (
                <select
                  onChange={handleClassificationChange}
                  onFocus={handleFocus}
                  value={classification}
                >
                  <option value="PhD">博士生論壇</option>
                  <option value="News">要聞共賞</option>
                </select>
              )}
            </PostCatagory>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <CKEditorContainer>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                config={{ placeholder: "請輸入文章內容" }}
                onReady={(editor) => {
                  editorDataRef.current = editor;
                }}
                onFocus={handleFocus}
                onChange={handleContentChange}
              />
            </CKEditorContainer>
            <SubmitButton onClick={handleSubmitUpdatePost}>發布</SubmitButton>
          </CreatePost>
        </GeneralBlock>
      </CreatePostContainer>
    </Root>
  );
}

export default EditPostPage;
