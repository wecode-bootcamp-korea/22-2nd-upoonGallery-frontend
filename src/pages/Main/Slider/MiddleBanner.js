import React from 'react';
import styled from 'styled-components';

export default function MiddleBanner() {
  return (
    <MiddleBannerContainer>
      <MiddleBannerWrap>
        <MiddleBannerImg />
      </MiddleBannerWrap>
    </MiddleBannerContainer>
  );
}

const MiddleBannerContainer = styled.div`
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
