import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TopSlideContents from './TopSlideContents';

export default function TopSlider() {
  const slideRef = React.useRef();
  const [slideIndex, setSlideIndex] = useState(1);

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
      <Label>
        <Handler>
          <PreviousBtn onClick={slidePrev} />
          <NextBtn onClick={slideNext} />
        </Handler>
      </Label>
      <BannerMask>금주의 작품</BannerMask>
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
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
`;
