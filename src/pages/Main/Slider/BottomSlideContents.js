import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function BottomSlideContents({ slideRef }) {
  const [bottomSlideData, setBottomSlideData] = useState([]);

  useEffect(() => {
    fetch(
      'http://10.58.0.226:8000/arts?sort=created-descend&limit=12&offset=1&shape=세로형'
    )
      .then(res => res.json())
      .then(data => {
        setBottomSlideData(data.results);
      });
  }, []);

  return (
    <div>
      <MoveDiv ref={slideRef}>
        <SlideImg>
          {bottomSlideData.map(slideData => (
            <img src={slideData.image_url} alt="하단 슬라이드 이미지" />
          ))}
        </SlideImg>
      </MoveDiv>
    </div>
  );
}

const SlideImg = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;

  img {
    display: inline-block;
    height: 250px;
    margin: 0 10px;
  }
`;

const MoveDiv = styled.div`
  position: absolute;
  width: 600%;
  height: 250px;
  transform: translateX(-16.6666666%);
  background-color: #eee;
`;
