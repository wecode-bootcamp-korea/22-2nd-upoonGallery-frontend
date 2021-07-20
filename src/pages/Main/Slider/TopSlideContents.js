import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function TopSlideContents({ slideRef }) {
  const [topSlideData, setTopSlideData] = useState([]);

  useEffect(() => {
    fetch(
      'http://10.58.0.226:8000/arts?sort=created-descend&limit=4&offset=1&shape=가로형'
    )
      .then(res => res.json())
      .then(data => {
        let tempData = [data.results];
        tempData[0].push(tempData[0][0]);
        tempData[0].unshift(tempData[0][3]);
        setTopSlideData(tempData[0]);
      });
  }, []);

  return (
    <div>
      <MoveDiv ref={slideRef}>
        {topSlideData.map(slideData => (
          <SlideImg src={slideData.image_url} />
        ))}
      </MoveDiv>
    </div>
  );
}

const SlideImg = styled.div`
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
`;

const MoveDiv = styled.div`
  display: flex;
  background-color: green;
  width: 600%;
  height: 100%;
  position: absolute;
  bottom: 0;
  transform: translateX(100/6 %);
`;
