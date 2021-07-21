import React from 'react';
import styled from 'styled-components';

const ReviewModal = ({
  reviewModal,
  comment,
  uploadImg,
  modalOnOff,
  handleTextArea,
  handleFileChange,
  sendReview,
}) => {
  return (
    <>
      {reviewModal.reviewUpload && (
        <Background onClick={modalOnOff}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <Title>리뷰 작성</Title>
            <SelectionBar />
            {uploadImg.file !== null && (
              <ImgView>
                <img src={uploadImg.previewURL} alt="" />
              </ImgView>
            )}
            <ReviewForm>
              <FileInput>이미지 업로드</FileInput>
              <UploadBtn
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                name="ReviewImg"
                onChange={handleFileChange}
              />
              <Comment
                onChange={handleTextArea}
                name="Comment"
                value={comment.Comment}
                placeholder="리뷰를 작성해주세요."
              />
            </ReviewForm>
            <SummitBtn onClick={sendReview}>제출하기</SummitBtn>
          </ModalContainer>
        </Background>
      )}
    </>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  width: 420px;
  padding: 16px;
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
  align-items: center;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  margin: 16px 0 10px;
  font-size: 20px;
`;

const SelectionBar = styled.div`
  width: 42px;
  height: 3px;
  margin: 8px auto 24px;
  background-color: #222;
`;

const ImgView = styled.div`
  width: 330px;
  height: 330px;
  border: 1px solid #eee;
  border-radius: 10px;

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
`;

const FileInput = styled.label`
  padding: 6px 25px;
  margin-top: 10px;
  background-color: #fff;
  border: solid 1px #dfdfdf;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

const Comment = styled.textarea`
  padding: 10px 10px;
  margin: 10px 0 18px;
  resize: none;
  border-radius: 10px;
  border: 1px solid #5f5f5f;
  width: 310px;
  height: 60px;

  ::placeholder {
    padding: 20px 10px;
    font-size: 14px;
  }

  :focus {
    outline: none;
  }
`;

const SummitBtn = styled(FileInput)`
  font-size: 14px;
  margin-bottom: 16px;
`;

export default ReviewModal;
