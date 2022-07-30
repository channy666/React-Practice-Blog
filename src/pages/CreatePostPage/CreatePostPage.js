import styled from "styled-components";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SideBar from "../../component/SideBar";
import { GeneralBlock } from "../../component/Blocks";
import { AuthContext } from "../../context";
import { createPost } from "../../WebAPI";
import { getAuthToken, setAuthToken } from "../../utils/authorization";
import { white, blue } from "../../utils/colors";
import sort from "../../utils/sortPost";

const Root = styled.div`
  display: flex;
  padding: 80px 0px 50px 7vw;
  background: ${white.swan};
`;

const CreatePostContainer = styled.div`
  width: 72%;
  margin-bottom: 60px;
`;

const CreatePost = styled.div`
  padding: 40px 5% 30px 6%;
  width: 90%;
`;

const PostTitle = styled.div`
  width: 90%;
  height: 40px;
  margin-bottom: 45px;

  input {
    height: 100%;
    width: 100%;
    font-size: 16px;
    border: 1px solid rgba(60, 63, 78, 0.2);

    ::placeholder {
      color: #757575;
    }
  }
`;

const PostCatagory = styled.div`
  margin-bottom: 40px;

  select {
    height: 40px;
    font-size: 16px;
    color: #757575;
    border: 1px solid rgba(60, 63, 78, 0.2);
    margin-right: 40px;

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
  width: 6vw;
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
`;

const CKEditorContainer = styled.div`
  width: 55vw;
  margin-bottom: 60px;
  .ck-editor {
    .ck-editor__main {
      .ck-content {
        height: 700px;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: Red;
  margin-top: 8px;
  font-weight: bold;
`;

function CreatePostPage() {
  const editorDataRef = useRef();
  const scrollIntoViewRef = useRef();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [category, setCategory] = useState("");
  const [classification, setClassification] = useState("");
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

  const handleSubmitPost = () => {
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

    const postData = {
      title,
      body: editorDataRef.current.getData(),
      category,
      classification,
      starCount: 0,
      starUserId: [],
      coverImage: category === "Forum" ? "https://i.imgur.com/gBZjnsu.jpg" : "",
    };

    createPost(postData)
      .then((data) => {
        if (data.ok === 0) {
          setErrorMessage(data.message);
          scrollIntoViewRef.current.scrollIntoView();
          // `code: 2` 代表使用者沒有發文權限
          if (data.code === 2) {
            setUser(null);
            setAuthToken("");
            navigate("/");
          }
          return;
        }
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

  const handlePostTitle = useCallback((e) => {
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

  return (
    <Root>
      <SideBar />
      <CreatePostContainer>
        <GeneralBlock
          title="發布文章"
          postBackgroundColor="rgba(255, 255, 255, 0.5)"
          titleBackgroundColor={white.swan}
        >
          <CreatePost ref={scrollIntoViewRef}>
            <PostTitle>
              <input
                placeholder=" 請輸入文章標題"
                onChange={handlePostTitle}
                value={title}
                onFocus={handleFocus}
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </PostTitle>
            <PostCatagory>
              <select onChange={handleCategoryChange} onFocus={handleFocus}>
                <option value="" selected disabled hidden>
                  請選擇文章分類
                </option>
                <option value="Research">研究觀點</option>
                <option value="Analysis">要文評析</option>
                <option value="Forum">公眾論壇</option>
              </select>
              {category &&
                (category === "Research" || category === "Analysis") && (
                  <select
                    onChange={handleClassificationChange}
                    onFocus={handleFocus}
                  >
                    <option value="" selected disabled hidden>
                      {`請選擇${sort.categoryName[category]}分類`}
                    </option>
                    <option value="FinTech">金融科技</option>
                    <option value="General">一般產業</option>
                  </select>
                )}
              {category && category === "Forum" && (
                <select
                  onChange={handleClassificationChange}
                  onFocus={handleFocus}
                >
                  <option value="" selected disabled hidden>
                    {`請選擇${sort.categoryName[category]}分類`}
                  </option>
                  <option value="PhD">博士生論壇</option>
                  <option value="News">要聞共賞</option>
                </select>
              )}
            </PostCatagory>
            <CKEditorContainer>
              <CKEditor
                editor={ClassicEditor}
                data={""}
                config={{ placeholder: "請輸入文章內容" }}
                onReady={(editor) => {
                  editorDataRef.current = editor;
                }}
                onFocus={handleFocus}
              />
            </CKEditorContainer>
            <SubmitButton onClick={handleSubmitPost}>發布</SubmitButton>
          </CreatePost>
        </GeneralBlock>
      </CreatePostContainer>
    </Root>
  );
}

export default CreatePostPage;
