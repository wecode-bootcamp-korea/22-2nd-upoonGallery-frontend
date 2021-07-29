import TopSlider from './Slider/TopSlider';
import MiddleBanner from './Slider/MiddleBanner';
import styled from 'styled-components';

export default function Main() {
  return (
    <div>
      <TopSlider />
      <Title>
        <i className="fas fa-paint-brush"></i>
        UPoon Gallery
      </Title>
      <Desc>
        <DescTitle>그림으로 변화된 공간</DescTitle>
        <DescText>
          유명 작가들의 하나뿐인 그림들을 합리적인 가격으로대여하고,
        </DescText>
        <DescText>
          3개월 마다 언제든 원하는 그림으로 교체할 수 있는 서비스를
          이용해보세요.
        </DescText>
      </Desc>
      <MiddleBanner />
    </div>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px 0 10px;
  font-size: 60px;
  font-weight: 600;

  .fas {
    margin-right: 20px;
    color: pink;
  }
`;

const Desc = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const DescText = styled.div`
  margin: 20px 0 10px 30px;
  font-size: 20px;
  color: #4a4a4a;
`;

const DescTitle = styled(DescText)`
  margin: 5px 0 50px 30px;
  font-size: 28px;
  color: #dfdfdf;
`;
