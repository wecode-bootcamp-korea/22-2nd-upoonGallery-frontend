import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../config';
import styled from 'styled-components';
import Slide from './Components/Slide';
import DetailCard from './Components/DetailCard';
import ReviewModal from './Components/ReviewModal';

const Detail = props => {
  const [images, setImages] = useState([]);
  const [imgNo, setImgNo] = useState(0);
  const [colorIndex, setColorIndex] = useState('0');
  const [btnArr, setBtnArr] = useState([
    { id: 1, color: '#f5f5f5', src: '' },
    { id: 2, color: '#dbdbdb', src: '' },
    { id: 3, color: '#e3e0d7', src: '' },
    { id: 4, color: '#c8d0d4', src: '' },
    { id: 5, color: '#a5a5a5', src: '' },
    { id: 6, color: '#943130', src: '' },
    { id: 7, color: '#353535', src: '' },
  ]);
  const [reviewModal, setReviewModal] = useState({ reviewUpload: false });
  const [comment, setComment] = useState({ Comment: '' });
  const [uploadImg, setUploadImg] = useState({
    file: null,
    previewURL: '',
  });
  const [relativeImg, setRelativeImg] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${API}/arts/${id}`)
      .then(res => res.json())
      .then(data => setImages(data.art_information));
  }, [id]);

  useEffect(() => {
    if (images) {
      fetch(`${API}/arts?artist=${images.artist_name}`)
        .then(res => res.json())
        .then(data => setRelativeImg(data.results.map(i => i.image_url)));
    }
  }, [images]);

  const colorChange = id => {
    const newArr = btnArr.slice();

    for (let i = 0; i < newArr.length; i++) {
      if (i !== id) {
        newArr[i].src = 'none';
      } else if (id === 5 || id === 6) {
        newArr[id].src = 'http://localhost:3000/images/checkwhite.png';
      } else if (i === id) {
        newArr[i].src = 'http://localhost:3000/images/check.png';
      }
    }
    setBtnArr(newArr);
    setColorIndex(id);
  };

  const slideChange = index => {
    setImgNo({ imgNo: index });
  };

  const numberWithCommas = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const imageId = [images].find(function (image) {
    // eslint-disable-next-line eqeqeq
    return image.id == id;
  });

  const modalOnOff = e => {
    const { name } = e.target;
    setReviewModal({ [name]: !reviewModal[name] });
  };

  const handleTextArea = e => {
    const { value, name } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleFileChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setUploadImg({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const sendReview = () => {
    let formData = new FormData();
    let file = uploadImg.file;
    let comments = comment.Comment;
    formData.append('file', file);
    formData.append('comment', comments);
    fetch('http://10.58.0.235:8000/arts/1/reviews', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.8kS5bf94lyvqiJ3kgmmP9jRoNi0sdyDkgbIdaAwjnlo',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(
        setComment({ Comment: '' }),
        setUploadImg({ file: null, previewURL: '' })
      );
  };

  return (
    <ArtWork>
      {images.length !== 0 && (
        <DetailContents>
          <PicName>{imageId.title}</PicName>
          <Slide
            images={images}
            imageId={imageId}
            imgNo={imgNo}
            slideChange={slideChange}
          />
          <Copyright>
            <span>
              이미지를 클릭하면 확대하여 보실 수 있습니다. 무단 도용 및 재배포를
              금지합니다.
            </span>
            <span>Copyright © {imageId.artist_name} All rights reserved.</span>
          </Copyright>
          <Hanging>작품 걸어보기</Hanging>
          <SelectionBar></SelectionBar>
          <SelectColor>
            {btnArr.length !== 0 && (
              <BackgroundBox color={btnArr[colorIndex].color}>
                <Paint>
                  <img src={imageId.image_urls[0]} alt="" />
                </Paint>
                <img src="http://localhost:3000/images/bg.png" alt="" />
              </BackgroundBox>
            )}
            <ColorPicker>
              <ColorPickerText>배경색</ColorPickerText>
              <BtnContainer>
                {btnArr.map((btn, idx) => (
                  <Btn
                    key={idx}
                    onClick={() => colorChange(idx)}
                    color={btn.color}
                    src={btn.src}
                  ></Btn>
                ))}
              </BtnContainer>
            </ColorPicker>
          </SelectColor>
          <Introduction>
            <ShareContainer>
              <i className="fas fa-comment"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
            </ShareContainer>
            <AuthorContainer>
              <Infos>
                <NamePic>
                  <AuthorPic>
                    <img
                      src="https://og-data.s3.amazonaws.com/static/pages/img/service/detailview/artist-img@2x.png"
                      alt=""
                    />
                  </AuthorPic>
                  <AuthorName>{imageId.artist_name}</AuthorName>
                  <MoreBtn>작품 더보기</MoreBtn>
                </NamePic>
                <AuthorSchool>
                  Harvard University Bachelor's Degrees In Philosophy
                </AuthorSchool>
              </Infos>
              <PaintInfo>
                <PaintName>{imageId.title}</PaintName>
                <PaintInfoTalble>
                  <span>{imageId.discription}</span>
                  <span>{imageId.size}호, 2021</span>
                  <PaintCode>작품코드 : A9512-3698</PaintCode>
                </PaintInfoTalble>
                <SettingPrice>
                  <span>* 출장비 및 설치비는 별도입니다.</span>
                  <span>* 렌탈 중인 작품 구매시 렌탈요금을 돌려드립니다.</span>
                  <span>* 작품에 따라 액자가 포함될 수 있습니다.</span>
                </SettingPrice>
              </PaintInfo>
              <RentInfo>
                <RentPrice>
                  렌탈요금 : {numberWithCommas(+imageId.price)}원
                  <span> /월 (VAT포함)</span>
                </RentPrice>
                <RentBtn>
                  <i className="fas fa-shopping-cart"></i>
                </RentBtn>
              </RentInfo>
            </AuthorContainer>
          </Introduction>
          <Hanging>이용 후기</Hanging>
          <SelectionBar></SelectionBar>
          <ReviewContainer>
            <Review>
              <ReviewImage>
                <img src={imageId.image_urls[0]} alt="" />
              </ReviewImage>
              <ReviewContents>
                <ReviewerInfo>
                  <img
                    src="https://og-data.s3.amazonaws.com/static/pages/img/service/detailview/artist-img@2x.png"
                    alt=""
                  />
                  <span>이재현</span>
                </ReviewerInfo>
                <ReveiwComment>자 드가자</ReveiwComment>
              </ReviewContents>
            </Review>
            <UploadReview name="reviewUpload" onClick={modalOnOff}>
              <i className="fas fa-edit"></i>
              리뷰 등록
            </UploadReview>
            <ReviewModal
              reviewModal={reviewModal}
              modalOnOff={modalOnOff}
              comment={comment}
              uploadImg={uploadImg}
              handleTextArea={handleTextArea}
              handleFileChange={handleFileChange}
              sendReview={sendReview}
            ></ReviewModal>
          </ReviewContainer>
          <Hanging>다른 작품 보기</Hanging>
          <SelectionBar></SelectionBar>
          <DetailCard relativeImg={relativeImg} />
        </DetailContents>
      )}
    </ArtWork>
  );
};

const ArtWork = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const DetailContents = styled.div`
  width: 800px;
`;

const PicName = styled.div`
  margin: 30px 0;
  font-size: 24px;
  font-weight: bold;
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;

  span {
    margin: 3px 0;
    color: #989898;
    font-size: 12px;
    text-align: center;
  }
`;

const Hanging = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

const SelectionBar = styled.div`
  width: 42px;
  height: 3px;
  margin: 8px auto 24px;
  background-color: #222;
`;

const SelectColor = styled.div`
  margin: 0 auto;
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 800px;
  height: 560px;
  background-color: ${({ color }) => color};
  margin-bottom: 30px;
  align-items: center;

  img {
    width: 800px;
    height: 560px;
  }
`;

const Paint = styled.div`
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 150px;
  width: 10%;
  max-height: 200px;
  z-index: 900;
  font-size: 0;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.2);
  cursor: move;

  img {
    width: 100%;
    max-height: 180px;
  }
`;

const ColorPicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorPickerText = styled.div`
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 20px 0;
`;

const Btn = styled.button`
  margin: 0 24px;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ color }) => color};
  background-image: url(${({ src }) => src});
  background-size: 60%;
  background-repeat: no-repeat;
  background-position-x: 6px;
  background-position-y: 6px;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0 80px;
  border: 1px solid #eee;
`;

const ShareContainer = styled.div`
  display: block;
  margin: 10px 0;
  text-align: right;

  .fas {
    margin-right: 15px;
    font-size: 20px;
    color: #5f5f5f;
    cursor: pointer;
  }

  .fab {
    margin-right: 15px;
    font-size: 20px;
    color: #5f5f5f;
    cursor: pointer;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background-color: #fafafa;
`;

const Infos = styled.div`
  display: block;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const NamePic = styled.div`
  display: flex;
  align-items: center;
  margin: 0 16px;
`;

const AuthorPic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;

  img {
    width: 34px;
    height: 34px;
  }
`;

const AuthorName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-size: 15px;
  font-weight: 300;
`;

const MoreBtn = styled.button`
  display: inline-block;
  margin-left: 14px;
  height: 36px;
  line-height: 16px;
  border-radius: 3px;
  background-color: #fff;
  border: solid 1px #dfdfdf;
  box-sizing: border-box;
  text-align: center;
  padding: 9px 14px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
`;

const AuthorSchool = styled.div`
  margin: 0 0 16px 10px;
  font-size: 12px;
  color: #989898;
`;

const PaintInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const PaintName = styled.div`
  margin: 10px 0 10px 16px;
  font-size: 20px;
  font-weight: 400;
  color: #3b3b3b;
`;

const PaintInfoTalble = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 16px;
  font-size: 15px;
  font-weight: 300;

  span {
    margin: 5px 0;
  }
`;

const PaintCode = styled.div`
  margin: 16px 0;
  font-size: 15px;
`;

const SettingPrice = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 16px;
  font-size: 10px;
  font-weight: 400;
  color: #989898;

  span {
    margin: 2px 0;
  }
`;

const RentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 16px 10px 0;
`;

const RentPrice = styled.div`
  margin: 10px 0 10px 16px;
  font-size: 18px;

  span {
    font-size: 14px;
    font-weight: 300;
  }
`;

const RentBtn = styled(MoreBtn)`
  padding: 0 20px;

  .fas {
    font-size: 18px;
    color: #5f5f5f;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 10px auto 80px;
`;

const Review = styled.div`
  display: flex;
  max-width: 680px;
  margin: 10px auto 20px;
`;

const ReviewImage = styled.div`
  width: 330px;
  height: 330px;
  border: 2px solid #eee;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ReviewContents = styled.div`
  height: 330px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 24px 20px;

  img {
    margin-right: 15px;
    width: 30px;
    height: 30px;
  }

  span {
    font-size: 16px;
    font-weight: 400;
  }
`;

const ReveiwComment = styled.div`
  margin-left: 24px;
  font-size: 20px;
`;

const UploadReview = styled(MoreBtn)`
  width: 160px;
  font-size: 14px;

  .fas {
    margin-right: 14px;
    color: #5f5f5f;
  }
`;

export default Detail;
