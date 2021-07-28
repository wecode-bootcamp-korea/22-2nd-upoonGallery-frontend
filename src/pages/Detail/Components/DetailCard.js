import React from 'react';
import styled from 'styled-components';

const DetailCard = ({ relativeImg }) => {
  return (
    <Masonry>
      {relativeImg.map((image, idx) => {
        return (
          <Grid key={idx}>
            <img src={image} alt="" />
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
