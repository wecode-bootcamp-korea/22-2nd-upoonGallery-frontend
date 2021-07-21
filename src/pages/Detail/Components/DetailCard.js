import React from 'react';
import styled from 'styled-components';

const DetailCard = ({ imageId }) => {
  return (
    <Masonry>
      {imageId.relative.map((relative, idx) => {
        return (
          <Grid key={idx}>
            <img src={relative} alt="" />
          </Grid>
        );
      })}
    </Masonry>
  );
};

const Masonry = styled.div`
  padding: 10px;
  columns: 4;
  column-gap: 16px;
`;

const Grid = styled.div`
  display: inline-block;
  margin-bottom: 16px;
  position: relative;

  img {
    width: 100%;
    border-radius: 5px;
  }
`;

export default DetailCard;
