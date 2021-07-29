import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DiscoverCard from './DiscoverCard';
import DiscoverPageNation from './DiscoverPageNation';
import { J_API } from '../../config';
import QueryString from './QueryString';

const LIMIT = 12;

const Discover = props => {
  const [arts, setArts] = useState([]);
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const [selected, setSelected] = useState({
    color: [],
    shape: [],
    size: {},
    price: {},
    sort: '',
    page: '',
  });

  console.log(params);
  useEffect(() => {
    fetch(
      location.search === ''
        ? `${J_API.DISCOVER}?limit=12`
        : `${J_API.DISCOVER}?${location.search}`
    )
      .then(res => res.json())
      .then(data => setArts(data));
  }, [location.search]);

  useEffect(() => {
    fetch('http://localhost:3000/data/filterList.json')
      .then(res => res.json())
      .then(data => setList(data.results));
  }, []);

  useEffect(() => {
    history.push(`/discover${query}`);
  }, [query]);

  useEffect(() => {
    setQuery(QueryString(selected));
  }, [selected]);

  useEffect(() => {
    let tempSelected = { ...selected };
    tempSelected = { ...tempSelected, page: '' };
    setSelected(tempSelected);
  }, [
    selected.color.length,
    selected.shape.length,
    selected.price.min_price,
    selected.size.min_size,
  ]);

  const pagesNumber = Math.round(Number(arts.total_count) / 12);
  const pageNationBtnNumber = [];
  const range = 2;
  const currentpage = Number(params.id) ? Number(params.id) : 1;
  const pageNationLeft = currentpage - range;
  const pageNationRight = currentpage + range;

  for (let i = 1; i < pagesNumber + 1; i++) {
    if (
      (i > pageNationLeft && i < pageNationRight) ||
      i === 1 ||
      i === pagesNumber
    ) {
      pageNationBtnNumber.push(i);
    } else if (i === pagesNumber - 1 || i === 2) {
      pageNationBtnNumber.push('...');
    }
  }

  const updateCurrentPage = value => {
    window.scrollTo(0, 0);

    let tempSelected = { ...selected };
    let tmpQuery = query;

    tempSelected = { ...tempSelected, page: value };
    tmpQuery = QueryString(tempSelected);

    setQuery(tmpQuery);
    setSelected(tempSelected);
  };

  const filterDiscoverList = (type, value) => {
    let tmp = { ...selected };

    if (type === 'shape' || type === 'color') {
      if (tmp[type].includes(value)) {
        tmp[type] = tmp[type].filter(typeValue => typeValue !== value);
        setSelected({ ...selected, [type]: [...tmp[type]] });
      } else {
        tmp[type].push(value);
        setSelected({ ...selected, [type]: tmp[type] });
      }
    } else if (type === 'size' || type === 'price') {
      if (Object.values(tmp[type])[0] === Object.values(value)[0]) {
        tmp[type] = {};
        setSelected({ ...selected, [type]: {} });
      } else if (tmp[type] !== value) {
        tmp[type] = value;
        setSelected({ ...selected, [type]: value });
      }
    }
  };

  const ordering = value => {
    let tempSelected = { ...selected };
    let tmpQuery = query;

    tempSelected = { ...tempSelected, sort: value };
    tmpQuery = QueryString(tempSelected);

    setQuery(tmpQuery);
    setSelected(tempSelected);
  };

  return (
    <div>
      <MarginForNav />
      <PageHeader>
        <LocationNow>
          <i class="fas fa-palette"></i>
          작품보기
        </LocationNow>
      </PageHeader>
      <FilterContainer>
        {list.length !== 0 &&
          list.map(category => (
            <FilterItem>
              <FilterTitle>{category.name}</FilterTitle>
              <FilterOptions>
                {category.category_list.map((list, Idx) => (
                  <FilterOption
                    onClick={() =>
                      filterDiscoverList(category.type, list.value, Idx)
                    }
                    categoryName={category.name}
                    isSelectedObject={selected[category.type] === list.value}
                    isSelectedArray={
                      category.type === 'color' || category.type === 'shape'
                        ? selected[category.type].includes(list.value)
                        : ''
                    }
                    optionType={category.type}
                    optionColor={list.color}
                  >
                    {category.type !== 'color' ? (
                      list.name
                    ) : (
                      <i className="fas fa-square-full"></i>
                    )}
                    {category.type === 'color' ? (
                      <SelectedColorCheck
                        isSelectedArray={
                          category.type === 'color'
                            ? selected[category.type].includes(list.value)
                            : ''
                        }
                      >
                        <i className="fas fa-check"></i>
                      </SelectedColorCheck>
                    ) : (
                      ''
                    )}
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterItem>
          ))}
      </FilterContainer>
      <ListHeader>
        <ListSort>
          {arts.total_count}점의 작품 검색됨
          <form>
            <select
              onChange={e => {
                ordering(e.target.value);
              }}
            >
              <option value="">옵션선택</option>
              <option value={'created-descend'}>최신 등록순</option>
              <option value={'price-ascend'}>낮은 가격순</option>
              <option value={'size-ascend'}>작은 크기순</option>
            </select>
          </form>
        </ListSort>
      </ListHeader>
      {arts.length !== 0 && (
        <>
          <List>
            {arts.results.map(art => (
              <DiscoverCard
                id={art.art_id}
                title={art.title}
                artist={art.artist_name}
                size={art.size}
                imageSrc={art.image_url}
                history={history}
              />
            ))}
          </List>
          <PageNationBtnWrap>
            {pageNationBtnNumber.map((el, idx) => (
              <DiscoverPageNation
                key={idx}
                value={el}
                currentpage={currentpage}
                lastPageNumber={pagesNumber}
                updateCurrentPage={updateCurrentPage}
              />
            ))}
          </PageNationBtnWrap>
        </>
      )}
    </div>
  );
};

export default Discover;

const MarginForNav = styled.div`
  margin-top: 80px;
`;

const PageHeader = styled.header`
  position: relative;
  width: 90%;
  margin: 30px auto 0;
`;

const LocationNow = styled.div`
  max-width: 1150px;
  text-align: right;
  margin: 0px auto;
  font-size: 16px;
  cursor: pointer;

  .fas {
    font-size: 16px;
    color: #5f5f5f;
    margin-right: 10px;
  }
`;

const FilterContainer = styled.section`
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 1150px;
  margin: 20px auto 0;
`;

const List = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 2px;
  grid-gap: 8px;
  margin: 25px auto 0;
  max-width: 1150px;
  border-radius: 15px;
`;

const ListHeader = styled.div`
  text-align: right;
`;

const ListSort = styled.div`
  max-width: 1150px;
  margin: 20px auto;
  font-size: 14px;

  form {
    margin-top: 10px;

    select {
      width: 90px;
      padding: 5px 10px;
      border: 1px solid #999;
      background-color: #fafafa;
      border-radius: 5px;
    }
  }
`;

const FilterItem = styled.div`
  height: 40px;
  padding: 10px 0px;
  color: #5f5f5f;
`;

const FilterTitle = styled.div`
  display: inline-block;
  width: 80px;
  height: 100%;
  text-align: center;
  line-height: 40px;
  font-weight: 500;
  color: #000;
`;

const FilterOptions = styled.div`
  display: inline-block;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin: 0px 10px;
`;

const FilterOption = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: ${({ optionType }) =>
    optionType === 'color' ? '0 10px' : '0 14px'};
  margin: 0 10px;
  height: 100%;

  background-color: ${props =>
    props.optionType === 'color' ? props.optionColor : ''};
  color: ${({ optionType, optionColor }) =>
    optionType === 'color' ? optionColor : ''};
  border-radius: ${props => (props.optionType === 'color' ? '50%' : '5px')};
  border: ${({ isSelectedArray, isSelectedObject }) =>
    isSelectedArray || isSelectedObject
      ? '2px solid #5f5f5f'
      : '1px solid #e9ecef'};
`;

const SelectedColorCheck = styled.div`
  position: absolute;
  top: 0;
  color: white;
  display: ${({ isSelectedArray }) => (isSelectedArray ? 'block' : 'none')};
`;
const PageNationBtnWrap = styled.section`
  display: block;
  margin: 40px auto;
  text-align: center;
`;
