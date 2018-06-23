import React, { Component } from 'react';
import styled from 'styled-components';

// Allowed file type
const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/bmp': 'bmp',
};

class FileDrop extends Component {
  dragEnterHandler = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  dragOverHandler = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  dropHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setPreview(e.dataTransfer.files);
  };

  setPreview = files => {
    [...files].forEach(file => {
      if (MIME_TYPES[file.type]) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.props.handler({ src: reader.result, extension: MIME_TYPES[file.type] });
        };
      } else {
        alert('File type should be images');
      }
    });
  };

  changeHandler = e => {
    this.setPreview(e.target.files);
  };

  render() {
    return (
      <DropZone
        onDragEnter={this.dragEnterHandler}
        onDragOver={this.dragOverHandler}
        onDrop={this.dropHandler}
        htmlFor="uploaderInput"
      >
        <StyledInput type="file" id="uploaderInput" onChange={this.changeHandler} />
        <Wrapper>
          <i className="fas fa-cloud-upload-alt" />
          <span>Drag an image or click here to upload...</span>
        </Wrapper>
      </DropZone>
    );
  }
}

export default FileDrop;

const DropZone = styled.label`
  position: relative;
  /* width: 25rem; */
  margin-right: 1.5rem;
  height: 7rem;
  background: #ebebeb;
  display: block;
`;

const StyledInput = styled.input`
  display: none;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #757575;
  & > i {
    display: block;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  & > span {
    font-weight: 900;
  }
`;
