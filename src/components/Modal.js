import React from "react";
import styled from "styled-components";
const Modal = ({ modal, img, currentImage }) => {
  return (
    <Wrapper onClick={modal}>
      <Background></Background>
      <ImageWrapper>
        <Image src={img[currentImage].imageSrc} />
      </ImageWrapper>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.div``;
const Background = styled.div`
  position: absolute;
  z-index: 100;
  background: black;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.9;
`;

const ImageWrapper = styled.div`
  position: fixed;
  z-index: 200;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

const Image = styled.img`
 
 @media (min-width: 1100px) {
    padding: 0;
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100vh;
    height: auto;
  }
  @media (max-width: 768px) and (orientation: landscape){
    padding: 0;
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100vh;
    height: auto;
  }
  @media (max-width: 768px) {
    width: 85vw;
  }
  @media (max-width: 576px) {
    width: 95vw;
  } 
`;

Image.defaultProps = {
  src: "",
};
