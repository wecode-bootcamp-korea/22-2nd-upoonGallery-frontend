import React from 'react';
import styled from 'styled-components';

export default function DiscoverPageNation({
  key,
  value,
  currentpage,
  lastPageNumber,
  updateCurrentPage,
}) {
  return value !== '...' ? (
    <DiscoverPageNationBtn
      onClick={() => updateCurrentPage(value)}
      currentpage={currentpage}
      value={value}
      isSamePage={currentpage === value}
    >
      {value}
    </DiscoverPageNationBtn>
  ) : (
    <DiscoverPageNationDotBtn> {value} </DiscoverPageNationDotBtn>
  );
}

const DiscoverPageNationBtn = styled.div`
  display: inline-block;
  border: 1px solid black;
  width: 20px;
  height: 20px;
  margin: 0px 3px;
  cursor: pointer;
  border-color: ${props => (props.isSamePage ? 'black' : '#dfdfdf')};
`;

const DiscoverPageNationDotBtn = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0px 3px;
`;
