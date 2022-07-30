/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi */

import styled from "styled-components";
import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerOrLogin, getMe } from "../../WebAPI";
import { setAuthToken, getAuthToken } from "../../utils/authorization";
import { AuthContext } from "../../context";
import { earth, white, blue } from "../../utils/colors";
import showPasswordIcon from "../../utils/images/eye.png";

const Root = styled.div`
  padding: 40px 0 70px 0;
  background: ${white.swan};
`;

const LogInContainer = styled.div`
  width: 45%;
  margin: 0 auto;
  padding: 50px 0px;
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
  height: 600px;
  border-radius: 10px;
  margin-top: -15px;
  border: 1.5px solid rgba(60, 63, 78, 0.2);
`;

const Username = styled.div`
  display: flex;
  margin: 0px 0px 60px 20%;
  font-size: 17px;
  align-items: center;
  color: ${blue.darker};

  input {
    width: 50%;
    height: 35px;
    margin-left: 1%;
    border: 1.5px solid rgba(60, 63, 78, 0.2);
  }

  ${(props) =>
    props.$isLoginMode &&
    `
    margin: 45px 0px 90px 18%;
  `}
`;

const Nickname = styled(Username)``;

const Password = styled(Username)`
  margin: 0px 0px 40px 20%;

  ${(props) =>
    props.$isLoginMode &&
    `
    margin: 45px 0px 55px 18%;
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
  padding-left: 12px;

  :hover {
    background: ${earth.sun};
    font-weight: bold;
    border: none;
  }
`;

const Error = styled.div`
  color: ${earth.honey};
  font-weight: bold;
  margin-left: 18%;
  font-size: 16px;
  visibility: hidden;
  height: 30px;

  ${(props) =>
    props.$hasError &&
    `
    visibility: visible;
  `}
`;

const Reminder = styled.div`
  color: ${blue.darker};
  margin: 0 0 15px 20%;

  span {
    font-weight: bold;
    color: ${white.white};
    background: ${blue.darkest};
    padding: 1px 4px 1px 5px;
    letter-spacing: 2.5px;
  }
`;

const SuccessMessageContainer = styled(ContentContainer)``;

const SuccessMessageContent = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: ${blue.darker};
  margin: 60px auto;
  text-align: center;
  padding-bottom: 30px;
`;

const ToHomePageButton = styled(Submit)`
  :hover {
    background: ${white.beidge};
  }
`;

function LogInPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleToHomePageButtonClick = useCallback(() => {
    navigate("/");
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
                  <div>若還是無法登入，請重新註冊</div>
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
            <ToHomePageButton onClick={handleToHomePageButtonClick}>
              返回首頁
            </ToHomePageButton>
          </SuccessMessageContainer>
        )}
      </LogInContainer>
    </Root>
  );
}

export default LogInPage;
