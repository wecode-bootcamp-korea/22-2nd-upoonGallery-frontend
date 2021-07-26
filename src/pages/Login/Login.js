import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN_API } from '../../config';
const { Kakao } = window;

const Login = props => {
  const history = useHistory();

  const handleKakaoLogin = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch(LOGIN_API, {
          method: 'GET',
          headers: { Authorization: authObj.access_token },
        })
          .then(response => response.json())
          .then(result => {
            localStorage.setItem('access_token', result.access_token);
            alert('로그인 성공');
            history.push('/main');
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <LoginPage>
      <LoginContain>
        <h1>로그인</h1>
        <BtnContainer>
          <KaKaoBtn onClick={handleKakaoLogin}>
            <i className="fas fa-comment"></i>
            <BtnText>카카오로 로그인</BtnText>
          </KaKaoBtn>
          <FaceBookBtn>
            <i className="fab fa-facebook-f"></i>
            <BtnText>페이스북으로 로그인</BtnText>
          </FaceBookBtn>
          <GoogleBtn>
            <i className="fab fa-google-plus-g"></i>
            <BtnText>구글로 로그인</BtnText>
          </GoogleBtn>
        </BtnContainer>
        <GoToSignUp>
          아직 회원이 아니시라면?
          <Link className="linkToSignUp" to="/signup">
            회원가입
          </Link>
        </GoToSignUp>
      </LoginContain>
    </LoginPage>
  );
};

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 140px 0;
`;

const LoginContain = styled.div`
  text-align: center;
  align-items: center;
  padding: 20px 50px;
  margin: 0 auto;
  border: 1px solid #dfdfdf;

  h1 {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.5px;
    margin: 30px 0;
  }
`;

const BtnContainer = styled.div`
  align-items: center;
  margin: 0 auto 20px;
`;

const BtnText = styled.span`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;

const LoginBtn = styled.button`
  display: block;
  position: relative;
  padding: 0;
  margin: 50px 20px;
  width: 300px;
  height: 45px;
  line-height: 44px;
  align-items: center;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

const KaKaoBtn = styled(LoginBtn)`
  color: #783c00;

  .fas {
    position: absolute;
    top: 15px;
    left: 5px;
  }
`;

const FaceBookBtn = styled(LoginBtn)`
  color: #ffffff;
  background-color: #5577ba;

  .fab {
    position: absolute;
    top: 15px;
    left: 5px;
  }
`;

const GoogleBtn = styled(LoginBtn)`
  color: #ffffff;
  background-color: #f04031;

  .fab {
    position: absolute;
    top: 15px;
    left: 5px;
  }
`;

const GoToSignUp = styled.div`
  margin-bottom: 40px;
  font-size: 12px;
  color: #989898;

  .linkToSignUp {
    margin-left: 10px;
    color: #989898;
    font-weight: 500;
  }
`;

export default Login;
