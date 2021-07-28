import React from 'react';
import styled from 'styled-components';

const Slide = ({ images, imgNo, slideChange, imageId }) => {
  return (
    <>
      <ImageSlide>
        <SlideBox images={images} imgNo={imgNo} imageId={imageId}>
          {imageId.image_urls.map((src, idx) => {
            return (
              <Slidelist key={idx}>
                <img src={src} alt="art" />
              </Slidelist>
            );
          })}
        </SlideBox>
      </ImageSlide>
      <BtnContainer>
        {imageId.image_urls.map((src, idx) => {
          return (
            <BtnImg key={idx} onClick={() => slideChange(idx)}>
              <img src={src} alt="art" />
            </BtnImg>
          );
        })}
      </BtnContainer>
    </>
  );
};

const ImageSlide = styled.div`
  display: flex;
  position: relative;
  width: 798px;
  height: 598px;
  overflow: hidden;
  border: 1px solid #eee;
  background-color: #fafafa;
`;

const SlideBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ imageId }) => imageId.image_urls.length * 800}px;
  transform: translateX(${({ imgNo }) => imgNo.imgNo * -800}px);
  transition: all 300ms ease 0s;
  position: relative;
  margin: auto;
  background-color: #fafafa;
`;

const Slidelist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;

  img {
    max-width: 800px;
    max-height: 598px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const BtnImg = styled.div`
  width: 42px;
  height: 42px;
  border: 2px solid #dfdfdf;
  margin: 5px 5px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
export default Slide;
