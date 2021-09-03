import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import TopSlideContents from './TopSlideContents';

export default function TopSlider() {
  const slideRef = React.useRef();
  const [slideIndex, setSlideIndex] = useState(1);
  const history = useHistory();

  const slideNext = () => {
    if (slideIndex < 5) {
      setSlideIndex(slideIndex + 1);
      slideRef.current.style.transition = 'transform 0.25s';
      slideRef.current.style.transform = `translateX(-${
        (slideRef.current.scrollWidth / 6) * (slideIndex + 1)
      }px)`;
    }

    if (slideIndex === 5) {
      setSlideIndex(2);
      slideRef.current.style.transition = 'transform 0.001s';
      slideRef.current.style.transform = `translateX(-${
        slideRef.current.scrollWidth / 6
      }px)`;

      setTimeout(() => {
        slideRef.current.style.transition = 'transform 0.25s';
        slideRef.current.style.transform = `translateX(-${
          (slideRef.current.scrollWidth / 6) * 2
        }px)`;
      }, 50);
    }
  };

  const slidePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
      slideRef.current.style.transition = 'transform 0.25s';
      slideRef.current.style.transform = `translateX(-${
        (slideRef.current.scrollWidth / 6) * (slideIndex - 1)
      }px)`;
    }

    if (slideIndex === 0) {
      setSlideIndex(3);
      slideRef.current.style.transition = 'transform 0.001s';
      slideRef.current.style.transform = `translateX(-${
        (slideRef.current.scrollWidth / 6) * 4
      }px)`;

      setTimeout(() => {
        slideRef.current.style.transition = 'transform 0.25s';
        slideRef.current.style.transform = `translateX(-${
          (slideRef.current.scrollWidth / 6) * 3
        }px)`;
      }, 50);
    }
  };

  return (
    <Container>
      <TopBanner>
        <TopSlideContents slideRef={slideRef} />
      </TopBanner>
      <Label></Label>
      <BannerMask>
        <Ad>
          <BannerTitle>[금주의 작품]</BannerTitle>
          <BannerText>
            웃픈갤러리에서 이번 주의 베스트상품을 만나보세요.
          </BannerText>
        </Ad>
        <BannerBtn onClick={() => history.push('/discover')}>
          <span>작품 보러가기</span>
        </BannerBtn>
      </BannerMask>
      <Handler>
        <PreviousBtn onClick={slidePrev} />
        <NextBtn onClick={slideNext} />
      </Handler>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  background-color: #ebe8e3;
  min-height: 380px;
  height: 70vh;
  max-height: 750px;
  overflow: hidden;
`;

const TopBanner = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
`;

const Label = styled.div`
  position: absolute;
  bottom: 0px;
  height: 180px;
  width: 100%;
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
`;

const Handler = styled.div`
  position: absolute;
  left: 50%;
  display: flex;
  max-width: 1152px;
  width: 100%;
  height: 180px;
  bottom: 0px;
  transform: translateX(-50%);
`;

const Btn = styled.div`
  position: absolute;
  color: black;
  width: 34px;
  height: 34px;
  bottom: 90px;
  border-left: 3px solid #222;
  border-top: 3px solid #222;
  cursor: pointer;
`;

const PreviousBtn = styled(Btn)`
  left: 22px;
  transform: rotate(-45deg);
`;

const NextBtn = styled(Btn)`
  right: 22px;
  transform: rotate(135deg);
`;
const BannerMask = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: center;
  align-content: center;
  width: 100%;
  position: absolute;
  bottom: 38px;
  width: 100%;
  text-align: center;
`;

const Ad = styled.div`
  margin: 0 400px 30px 0;
`;

const BannerTitle = styled.div`
  display: flex;
  font-size: 50px;
`;

const BannerText = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 20px;
  color: #4a4a4a;
`;

const BannerBtn = styled.button`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin-top: 16px;
  height: 50px;
  background: #222;
  cursor: pointer;

  span {
    margin: 5px 10px;
    font-size: 16px;
    color: #fff;
  }
`;
