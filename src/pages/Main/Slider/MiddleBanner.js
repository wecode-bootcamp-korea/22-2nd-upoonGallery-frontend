import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

export default function MiddleBanner() {
  const history = useHistory();

  return (
    <MiddleBannerContainer>
      <MiddleBannerWrap>
        <MiddleBannerImg />
      </MiddleBannerWrap>
      <Ad>
        <BannerTitle>나의 그림 취향은?</BannerTitle>
        <BannerText>당신을 위한 그림을 웃픈갤러리에서 만나보세요.</BannerText>
        <BannerBtn onClick={() => history.push('/discover')}>
          <span>작품 보러가기</span>
        </BannerBtn>
      </Ad>
    </MiddleBannerContainer>
  );
}

const MiddleBannerContainer = styled.div`
  display: flex;
  margin: 250px 0px;
  background-color: #eaeaea;
`;

const MiddleBannerWrap = styled.section`
  width: 90%;
  margin: 0 auto;
  height: 380px;
`;

const MiddleBannerImg = styled.img.attrs({
  src: './images/middleBanner.png',
})`
  height: 100%;
`;

const Ad = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 0 30px 150px;
  flex-direction: column;
`;

const BannerTitle = styled.div`
  display: flex;
  margin-bottom: 30px;
  font-size: 50px;
  font-weight: bold;
  color: #5f5f5f;
`;

const BannerText = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 20px;
  color: #ffffff;
`;

const BannerBtn = styled.button`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 130px;
  margin: 60px 0 0 240px;
  height: 50px;
  background: #222;
  cursor: pointer;

  span {
    margin: 5px auto;
    font-size: 16px;
    color: #fff;
  }
`;
