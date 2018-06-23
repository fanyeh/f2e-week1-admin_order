import React, { Component } from 'react';
import styled from 'styled-components';
import FileDrop from './FileDrop';
import SpecInputs from './SpecInputs';
import DescInputs from './DescInputs';
import PreviewImage from './PreviewImage';
import { Button } from '../../components/InputStyles';
class ProductForm extends Component {
  state = {
    images: [],
    specs: [{ ref: React.createRef(), id: btoa(Date.now()) }],
    desc: React.createRef(),
  };

  setImages = image => {
    this.setState({ images: [...this.state.images, image] });
  };

  addSpec = () => {
    this.setState({
      specs: [...this.state.specs, { ref: React.createRef(), id: btoa(Date.now()) }],
    });
  };

  render() {
    const { images, specs, desc } = this.state;
    const { publishHandler, draftHandler, closeHandler } = this.props;

    return (
      <Wrapper>
        <div>
          <Header>
            <h1>Add new product</h1>
            <i className="fas fa-times" onClick={closeHandler} />
          </Header>
          <Content>
            <Section>
              <FileDrop handler={this.setImages} />
              <PreviewImage images={images} />
            </Section>

            <Section>
              <DescInputs descRef={desc} />
              {specs.map(spec => <SpecInputs specRef={spec.ref} key={spec.id} />)}
              <ButtonContainer>
                <AddButton onClick={this.addSpec}>Add New specification +</AddButton>
                <PublishButton onClick={() => publishHandler(this.state)}>publish</PublishButton>
                <DraftButton onClick={draftHandler}>Save draft</DraftButton>
              </ButtonContainer>
            </Section>
          </Content>
        </div>
      </Wrapper>
    );
  }
}

export default ProductForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: left;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & > div {
    width: 60%;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  padding: 1.88rem;
  display: flex;
  background: white;
`;

const Header = styled.div`
  margin-top: 6rem;
  padding: 1rem 2rem;
  background: #000000;
  color: white;
  & > h1 {
    font-size: 1.5rem;
    display: inline-block;
    margin: 0;
    text-transform: uppercase;
  }

  & > i {
    font-size: 1.5rem;
    float: right;
  }
`;

const Section = styled.div`
  width: 50%;
`;

const AddButton = Button.extend`
  width: 100%;
  display: block;
  margin-bottom: 1.25rem;
`;

const PublishButton = Button.extend`
  float: right;
  margin-left: 0.5rem;
`;

const DraftButton = Button.extend`
  color: #757575;
  background: none;
  float: right;
`;

const ButtonContainer = styled.div`
  margin-top: 1.25rem;
`;
