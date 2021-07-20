import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import BottomSlideContents from './BottomSlideContents';

export default function BottomSlider() {
  const slideRef = useRef();
  const [slideIndex, setSlideIndex] = useState(1);

  const slideNext = () => {
    if (slideIndex < 5) {
      setSlideIndex(slideIndex + 1);
      slideRef.current.style.transition = 'transform 0.25s';
      slideRef.current.style.transform = `translateX(-${
        (slideRef.current.scrollWidth / 15) * (slideIndex + 1)
      }px)`;
    }

    if (slideIndex === 5) {
      setSlideIndex(2);
      slideRef.current.style.transition = 'transform 0.001s';
      slideRef.current.style.transform = `translateX(-${
        slideRef.current.scrollWidth / 15
      }px)`;

      setTimeout(() => {
        slideRef.current.style.transition = 'transform 0.25s';
        slideRef.current.style.transform = `translateX(-${
          (slideRef.current.scrollWidth / 15) * 2
        }px)`;
      }, 50);
    }
  };

  const slidePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
      slideRef.current.style.transition = 'transform 0.25s';
      slideRef.current.style.transform = `translateX(-${
        (slideRef.current.scrollWidth / 15) * (slideIndex - 1)
      }px)`;
    }

    if (slideIndex === 0) {
      setSlideIndex(3);
      slideRef.current.style.transition = 'transform 0.001s';
      slideRef.current.style.transform = `translateX(-${
        (slideRef.current.scrollWidth / 15) * 4
      }px)`;

      setTimeout(() => {
        slideRef.current.style.transition = 'transform 0.25s';
        slideRef.current.style.transform = `translateX(-${
          (slideRef.current.scrollWidth / 15) * 3
        }px)`;
      }, 50);
    }
  };

  return (
    <Container>
      <BottomBanner>
        <Handler>
          <PreviousBtn onClick={slidePrev}>
            <i className="fas fa-chevron-left" />
          </PreviousBtn>
          <NextBtn onClick={slideNext}>
            <i className="fas fa-chevron-right" />
          </NextBtn>
        </Handler>
        <div className="slideOuter">
          <BottomSlideContents slideRef={slideRef} />
        </div>
      </BottomBanner>
      <Label />
    </Container>
  );
}

const Container = styled.section`
  position: relative;

  min-height: 380px;
  height: 70vh;
  max-height: 750px;
  overflow: hidden;
`;

const Handler = styled.div`
  position: absolute;
  top: -40px;
  width: 100%;
  height: 180px;
`;

const Btn = styled.div`
  position: absolute;
  display: inline-block;
  color: black;
  cursor: pointer;
`;

const PreviousBtn = styled(Btn)`
  right: 40px;
`;

const NextBtn = styled(Btn)`
  right: 20px;
`;

const BottomBanner = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
  position: relative;

  .slideOuter {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
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
