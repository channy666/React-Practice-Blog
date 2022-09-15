/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi */

import styled from "styled-components";
import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerOrLogin, getMe } from "../../WebAPI";
import { setAuthToken, getAuthToken } from "../../utils/authorization";
import { AuthContext } from "../../context";
import { earth, white, blue } from "../../utils/colors";
import showPasswordIcon from "../../utils/images/eye.png";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../utils/breakpoints";

const Root = styled.div`
  padding: 40px 0 70px 0;
  background: ${white.swan};
`;

const LogInContainer = styled.div`
  width: 45vw;
  margin: 0 auto;
  padding: 50px 0px;

  ${MEDIA_QUERY_XL} {
    width: 55vw;
  }

  ${MEDIA_QUERY_LG} {
    width: 65vw;
  }

  ${MEDIA_QUERY_MD} {
    width: 72vw;
  }

  ${MEDIA_QUERY_SM} {
    width: 85vw;
    padding: 20px 0px 30px 0;
  }
`;

const TitleContainer = styled.div`
  display: flex;
`;

const Register = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${blue.darker};
  height: 68px;
  background: ${white.smoke};
  letter-spacing: 20px;
  cursor: pointer;
  font-weight: bold;
  border: 1.5px rgba(60, 63, 78, 0.2);
  border-style: solid solid none solid;
  border-radius: 5px 5px 0px 0px;
  padding-left: 20px;

  ${MEDIA_QUERY_LG} {
    font-size: 22px;
    height: 65px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 20px;
    height: 60px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 18px;
    height: 50px;
  }

  ${(props) =>
    props.$successMessage &&
    `
    cursor: default;
  `}

  ${(props) =>
    !props.$active &&
    `
      background: ${white.beidge};
      color: ${white.white};
      border: 1.5px rgba(60, 63, 78, 0.2);
      border-style: none none solid none;

      :hover {
        color: ${earth.honey};
      }
  `};

  ${(props) =>
    !props.$active &&
    props.$successMessage &&
    `
      :hover {
        color: ${white.white};
      }
  `};
`;

const LogIn = styled(Register)``;

const ContentContainer = styled.div`
  background: ${white.smoke};
  width: 100%;
  padding-top: 90px;
  box-sizing: border-box;
  height: 620px;
  border-radius: 10px;
  margin-top: -15px;
  border: 1.5px solid rgba(60, 63, 78, 0.2);

  ${MEDIA_QUERY_XL} {
    padding-top: 70px;
    height: 610px;
  }

  ${MEDIA_QUERY_LG} {
    padding-top: 80px;
  }

  ${MEDIA_QUERY_MD} {
    padding-top: 70px;
    height: 550px;
  }

  ${MEDIA_QUERY_SM} {
    padding-top: 70px;
    height: 460px;
  }
`;

const Username = styled.div`
  display: flex;
  margin: 0px 0px 60px 20%;
  font-size: 17px;
  align-items: center;
  color: ${blue.darker};

  ${MEDIA_QUERY_XL} {
    margin: 30px 0px 60px 20%;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 16px;
    margin: 20px 0px 60px 20%;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 15px;
    margin: 0px 0px 50px 17%;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    margin: 0px 0px 35px 16%;
  }

  input {
    width: 55%;
    height: 35px;
    margin-left: 1%;
    border: 1.5px solid rgba(60, 63, 78, 0.2);
    font-size: 16px;

    ${MEDIA_QUERY_XL} {
      width: 60%;
      font-size: 16px;
    }

    ${MEDIA_QUERY_LG} {
      width: 56%;
      font-size: 15px;
    }

    ${MEDIA_QUERY_MD} {
      height: 30px;
      width: 56%;
      font-size: 14.5px;
    }

    ${MEDIA_QUERY_SM} {
      height: 26px;
      width: 56%;
      font-size: 14px;
    }
  }

  ${(props) =>
    props.$isLoginMode &&
    `
    margin: 40px 0px 80px 20%;

    ${MEDIA_QUERY_XL} {
      margin: 40px 0px 85px 20%;
    }

    ${MEDIA_QUERY_MD} {
      margin: 15px 0px 60px 17%;
    }

    ${MEDIA_QUERY_SM} {
      margin: 20px 0px 45px 14%;
    }
  `}
`;

const Nickname = styled(Username)``;

const Password = styled(Username)`
  margin: 0px 0px 40px 20%;

  ${MEDIA_QUERY_MD} {
    margin: 0px 0px 40px 17%;
  }

  ${MEDIA_QUERY_SM} {
    margin: 0px 0px 35px 16%;
  }

  ${(props) =>
    props.$isLoginMode &&
    `
    margin: 45px 0px 55px 20%;

    ${MEDIA_QUERY_XL} {
      margin: 45px 0px 70px 20%;
    }

    ${MEDIA_QUERY_MD} {
      margin: 50px 0px 50px 17%;
    }

    ${MEDIA_QUERY_SM} {
      margin: 50px 0px 40px 14%;
    }
  `}
`;

const TogglePasswordIcon = styled.div`
  cursor: pointer;
  margin-left: 3%;
  background-image: url(${(props) => props.$img});
  height: 25px;
  width: 25px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: relative;

  ${MEDIA_QUERY_LG} {
    height: 24px;
    width: 24px;
  }

  ${MEDIA_QUERY_SM} {
    height: 23px;
    width: 23px;
  }

  ${(props) =>
    props.$passwordShown &&
    `
    ::before {
      content: "";
      position: absolute;
      display: block;
      height: 3px;
      width: 28px;
      transform: rotate(40deg);
      background: ${earth.sun};
      border: 1.5px solid ${earth.wood};
      border-radius: 5px;
      top: 12px;
      right: -3px;
    }
  `}

  :hover {
    transform: scale(1.1);
  }
`;

const Submit = styled.button`
  display: flex;
  cursor: pointer;
  border: 1.5px solid rgba(60, 63, 78, 0.2);
  color: ${blue.darker};
  border-radius: 3px;
  width: 30%;
  height: 45px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 40px auto;
  font-size: 18px;
  letter-spacing: 12px;
  font-weight: bold;
  padding-left: 18px;

  :hover {
    background: ${earth.sun};
    font-weight: bold;
    border: none;
  }

  ${MEDIA_QUERY_XL} {
    margin: 35px auto;
  }

  ${MEDIA_QUERY_MD} {
    margin: 30px auto;
  }

  ${MEDIA_QUERY_SM} {
    padding-left: 18px;
    margin: 25px auto;
  }
`;

const Error = styled.div`
  color: ${earth.honey};
  font-weight: bold;
  margin-left: 20%;
  font-size: 16px;
  visibility: hidden;
  height: 30px;

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
  }

  ${MEDIA_QUERY_MD} {
    margin-left: 17%;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    margin-left: 16%;
  }

  ${(props) =>
    props.$hasError &&
    `
    visibility: visible;
  `}
`;

const Reminder = styled.div`
  color: ${blue.darker};
  margin: 0 15% 15px 20%;
  line-height: 28px;

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
    margin: 0 15% 0 20%;
  }

  ${MEDIA_QUERY_MD} {
    margin: 0 15%;
    line-height: 26px;
    margin: 0 15% 15px 17%;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    margin: 0 14% 5px 16%;
  }

  span {
    font-weight: bold;
    color: ${white.white};
    background: ${blue.darkest};
    padding: 1px 4px 2px 6px;
    letter-spacing: 2.5px;
    font-size: 18px;

    ${MEDIA_QUERY_LG} {
      font-size: 17px;
    }

    ${MEDIA_QUERY_SM} {
      font-size: 15px;
    }
  }
`;

const SuccessMessageContainer = styled(ContentContainer)``;

const SuccessMessageContent = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: ${blue.darker};
  margin: 60px auto;
  text-align: center;
  padding: 0px 0px 30px 24px;
  letter-spacing: 12px;

  ${MEDIA_QUERY_LG} {
    font-size: 26px;
    padding-bottom: 20px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 24px;
    padding-bottom: 10px;
  }
`;

const ToHomePageButton = styled(Submit)`
  :hover {
    background: ${white.beidge};
  }

  ${MEDIA_QUERY_MD} {
    width: 38%;
  }

  ${MEDIA_QUERY_SM} {
    width: 50%;
  }
`;

function LogInPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (successMessage) {
      window.scrollTo(0, 0);
      return;
    }
    if (getAuthToken() && user) {
      navigate("/");
    } else {
      setUser(null);
      setAuthToken("");
    }
    window.scrollTo(0, 0);
  }, [user, successMessage]);

  const handleModeChange = useCallback(
    (mode) => {
      if (
        (mode === "Register" && isRegisterMode) ||
        (mode === "LogIn" && !isRegisterMode)
      ) {
        return;
      }

      if (successMessage) return;

      setIsRegisterMode((prevState) => !prevState);
    },
    [isRegisterMode, successMessage]
  );

  const handleTogglePassword = useCallback(() => {
    setPasswordShown((prevState) => !prevState);
  }, []);

  const handleInputFocus = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleNicknameChange = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (username && password && (isRegisterMode ? nickname : true)) {
      registerOrLogin(username, password, isRegisterMode ? nickname : false)
        .then((data) => {
          if (data.ok !== 1) {
            return setErrorMessage(data.message);
          }
          setAuthToken(data.token);
          getMe().then((res) => {
            if (res.ok !== 1) {
              setErrorMessage(res.message);
              setAuthToken("");
              return;
            }
            setSuccessMessage(true);
            setUser(res.data);
          });
        })
        .catch(() => setErrorMessage("伺服器異常，請稍後再試"));
      return;
    }
    setErrorMessage("請確實填寫所有欄位！");
  };

  const handleNavigate = useCallback((page) => {
    navigate(page);
  }, []);

  return (
    <Root>
      <LogInContainer>
        <TitleContainer>
          <Register
            $active={isRegisterMode}
            onClick={() => handleModeChange("Register")}
            $successMessage={successMessage}
          >
            註冊
          </Register>
          <LogIn
            $active={!isRegisterMode}
            onClick={() => handleModeChange("LogIn")}
            $successMessage={successMessage}
          >
            登入
          </LogIn>
        </TitleContainer>
        {!successMessage && (
          <ContentContainer>
            <form onSubmit={handleFormSubmit}>
              <Username $isLoginMode={!isRegisterMode}>
                帳號：
                <input
                  type="text"
                  placeholder="請輸入帳號"
                  onFocus={handleInputFocus}
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Username>
              {isRegisterMode && (
                <Nickname>
                  暱稱：
                  <input
                    type="text"
                    placeholder="請輸入暱稱"
                    onFocus={handleInputFocus}
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                </Nickname>
              )}
              <Password $isLoginMode={!isRegisterMode}>
                密碼：
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="請輸入密碼"
                  onFocus={handleInputFocus}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <TogglePasswordIcon
                  onClick={handleTogglePassword}
                  $img={showPasswordIcon}
                  $passwordShown={passwordShown}
                />
              </Password>
              {isRegisterMode && (
                <Reminder>
                  本網站為練習用，註冊後會將您的密碼更改為 <span>123456</span>
                </Reminder>
              )}
              {!isRegisterMode && (
                <Reminder>
                  本網站為練習用，登入密碼請輸入 <span>123456</span>
                  <div>若還是無法登入，請重新註冊。</div>
                </Reminder>
              )}
              <Error $hasError={errorMessage}>{errorMessage}</Error>
              <Submit>{isRegisterMode ? "註冊" : "登入"}</Submit>
            </form>
          </ContentContainer>
        )}
        {successMessage && (
          <SuccessMessageContainer>
            <SuccessMessageContent>{`${
              isRegisterMode ? "註冊" : "登入"
            }成功！`}</SuccessMessageContent>
            {location.state && location.state !== "/" && (
              <ToHomePageButton onClick={() => handleNavigate(location.state)}>
                回上一頁
              </ToHomePageButton>
            )}
            <ToHomePageButton onClick={() => handleNavigate("/")}>
              返回首頁
            </ToHomePageButton>
          </SuccessMessageContainer>
        )}
      </LogInContainer>
    </Root>
  );
}

export default LogInPage;
