import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default function DiscoverCard({
  id,
  artist,
  title,
  imageSrc,
  size,
  history,
}) {
  const imageHeightRef = useRef(null);
  const [spans, setSpans] = useState(0);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (load) {
      const height = imageHeightRef.current.offsetHeight;
      const spans = Math.ceil(height / 10);
      setSpans(spans);
    }
    return setLoad(false);
  }, [load]);

  return (
    <DiscoverCardItem
      spans={spans}
      onLoad={() => setLoad(true)}
      onClick={() => {
        history.push(`detail/${id}`);
      }}
    >
      <div ref={imageHeightRef}>
        <DiscoverCardImgWrap>
          <DiscoverCardImg imageSrc={imageSrc} />
        </DiscoverCardImgWrap>
        <DiscoverCardDescription>
          <DiscoverCardTitle>{title}</DiscoverCardTitle>
          <DiscoverCardText>{artist}</DiscoverCardText>
          <DiscoverCardText>{size}호</DiscoverCardText>
        </DiscoverCardDescription>
      </div>
    </DiscoverCardItem>
  );
}

const DiscoverCardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 15px;
  grid-row-end: span ${props => props.spans};
  cursor: pointer;
`;

const DiscoverCardImgWrap = styled.div`
  width: 100%;
`;

const DiscoverCardDescription = styled.div`
  margin: 5px 0px 15px 0px;
  width: 100%;
`;

const DiscoverCardTitle = styled.div`
  display: block;
`;

const DiscoverCardText = styled.div`
  display: inline-block;
  margin: 10px 5px 0 0;
`;
const DiscoverCardImg = styled.img.attrs(imageSrc => ({
  src: imageSrc.imageSrc,
}))`
  width: 100%;
  border-radius: 15px;
`;
