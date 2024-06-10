import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin: 10px;
  overflow: hidden;
  border: ${(props) => (props.isSelected ? '3px solid rgba(0, 0, 0, 0.3)' : '1px solid #eee')};
  border-radius: 8px;
  box-shadow: ${(props) => (props.isSelected ? '0 4px 8px rgba(0, 123, 255, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)')};
  transition: transform 0.2s, box-shadow 0.2s, border 0.2s;
  cursor: pointer;
  transform: ${(props) => (props.isSelected ? 'translateY(-10px)' : 'translateY(0px)')};
  box-shadow: ${(props) => (props.isSelected ? '0 6px 12px #66545e' : '')};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${(props) => (props.isSelected ? '0 6px 12px #66545e' : '0 4px 8px #66545e')};
  }

  &::after {
    content: '';
    display: ${(props) => (props.isSelected ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s;
`;

interface ImageItemProps {
  src: string;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  isFeatured: boolean;
}

const ImageItem: React.FC<ImageItemProps> = ({ src, isSelected, onClick, onDelete, isFeatured }) => (
  <ImageContainer isSelected={isSelected} onClick={onClick}>
    <Image src={src} alt="" />
  </ImageContainer>
);

export default ImageItem;
