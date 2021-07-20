import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Nav = props => {
  const history = useHistory();

  return (
    <NavBox>
      <NavContainer>
        <Logo>
          <i className="fas fa-paint-brush fa-3x"></i>
          <LogoText>
            <span>UPOON</span>
            <span>GALLERY</span>
          </LogoText>
        </Logo>
        <MenuContain>
          <NavMenu>렌탈하기</NavMenu>
          <NavMenu>이용후기</NavMenu>
          <NavMenu>작가소개</NavMenu>
        </MenuContain>
        <MyPageContain>
          <i className="far fa-image fa-2x"></i>
          <i className="fas fa-search fa-2x"></i>
          <i class="fas fa-shopping-cart fa-2x"></i>
          <UserContain>
            <button onClick={() => history.push('/login')}>로그인</button>
            <button onClick={() => history.push('/signup')}>회원가입</button>
          </UserContain>
        </MyPageContain>
      </NavContainer>
    </NavBox>
  );
};

const NavBox = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: white;
  height: 60px;
  box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const Logo = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 90px;
  border: none;
  background-color: white;

  .fas {
    margin-right: 10px;
    color: pink;
  }
`;
const LogoText = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
`;

const MenuContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 150px;
`;

const NavMenu = styled.div`
  padding-left: 70px;
  font-size: 14px;
`;

const MyPageContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 220px;

  .far {
    margin-left: 20px;
    margin-right: 10px;
    color: pink;
    font-size: 30px;
  }

  .fas {
    margin-left: 20px;
    margin-right: 10px;
    color: pink;
    font-size: 25px;
  }
`;

const UserContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  margin-left: 10px;
  height: 60px;
  border-left: 1px solid #eee;

  button {
    border: none;
    background-color: transparent;
    margin-left: 20px;
    font-size: 14px;
    cursor: pointer;
  }
`;
export default Nav;
