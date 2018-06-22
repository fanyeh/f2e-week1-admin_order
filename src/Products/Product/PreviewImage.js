import React from 'react';
import styled from 'styled-components';
const PreviewImage = ({ images }) => {
  return (
    <ImageContainer>
      {images.map((image, index) => (
        <ImageWrapper key={index}>
          <StyledImage src={image.src} alt="" />
        </ImageWrapper>
      ))}
    </ImageContainer>
  );
};

export default PreviewImage;

const ImageContainer = styled.div`
  margin-top: 0.5rem;
  width: 25rem;
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  &:nth-of-type(3n + 1) {
    margin-left: 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
`;
