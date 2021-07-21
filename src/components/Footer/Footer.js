import React from 'react';
import styled from 'styled-components';

const Footer = props => {
  return (
    <FooterBar>
      <TextContainer>
        <FooterContainer>
          <FooterText>회사소개</FooterText>
          <FooterText>제휴문의</FooterText>
          <FooterText>작가공모 지원</FooterText>
        </FooterContainer>
        <CompanyInfo>
          상호명 : 웃픈갤러리
          <span>I</span>
          대표: 최현정
          <span>I</span>
          사업자등록번호: 874-12-36987
          <span>I</span>
          호스팅 제공자 : AWS
        </CompanyInfo>
        <CompanyInfo>
          통신판매신고번호 : 제2021-서울강남-98712호
          <span>I</span>
          주소 : 서울 강남구 테헤란로 위워크타워 3층 최현정 자리
        </CompanyInfo>
        <CompanyInfo>
          E-mail: contact@upoongallery.co.kr
          <span>I</span>© UPOON GALLERY, Inc.
        </CompanyInfo>
      </TextContainer>
      <ContactInfo>
        <Call>
          대표번호 1478 - 9632
          <span>평일 9:00 - 18:00</span>
        </Call>
        <Icons>
          <i className="fab fa-instagram fa-2x"></i>
          <i className="fab fa-apple fa-2x"></i>
          <i className="fab fa-google fa-2x"></i>
        </Icons>
      </ContactInfo>
    </FooterBar>
  );
};

const FooterBar = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background-color: #222222;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: left;
`;

const FooterText = styled.div`
  margin: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

const CompanyInfo = styled.div`
  display: flex;
  margin: 10px 20px;
  font-size: 12px;
  color: #989898;

  span {
    margin: 0 10px;
  }
`;

const ContactInfo = styled.div`
  margin-right: 30px;
`;

const Call = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #fff;

  span {
    margin: 2px 20px;
    font-size: 12px;
    color: #989898;
  }
`;

const Icons = styled.div`
  margin-left: 34px;

  .fab {
    margin: 30px 20px;
    font-size: 30px;
    color: #fff;
  }
`;
export default Footer;
