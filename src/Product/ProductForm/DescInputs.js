import React, { Component } from 'react';
import { Input, Label, LabelContainer, Title, TextArea } from '../../components/InputStyles';
import faker from 'faker';
import styled from 'styled-components';
class DescInputs extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   title: props.data ? props.data.title : null,
    //   description: props.data ? props.data.description : null,
    //   original: props.data ? props.data.originalPrice : null,
    //   discount: props.data ? props.data.discountPrice : null,
    // };
    this.state = {
      title: faker.lorem.words(),
      description: faker.lorem.sentences(),
      original: Math.floor(faker.commerce.price(1000, 5000, 0) / 100) * 100,
      discount: Math.floor(faker.commerce.price(100, 500, 0) / 10) * 10,
    };
  }

  titleHandler = e => {
    this.setState({ title: e.target.value });
  };
  descriptionHandler = e => {
    this.setState({ description: e.target.value });
  };
  originalHandler = e => {
    this.setState({ original: e.target.value });
  };
  discountHandler = e => {
    this.setState({ discount: e.target.value });
  };

  render() {
    const { title, description, original, discount } = this.state;
    return (
      <form ref={this.props.descRef}>
        <TitleInput
          name="title"
          type="text"
          placeholder="Title"
          full
          value={title}
          onChange={this.titleHandler}
        />
        <TextArea
          name="description"
          id=""
          cols="30"
          rows="10"
          placeholder="Description"
          value={description}
          onChange={this.descriptionHandler}
        />
        <Title>Price</Title>
        <LabelContainer>
          <Label title="Original">
            <Input type="number" name="original" value={original} onChange={this.originalHandler} />
          </Label>
          <Label title="Discount">
            <Input type="number" name="discount" value={discount} onChange={this.discountHandler} />
          </Label>
        </LabelContainer>
      </form>
    );
  }
}

export default DescInputs;

const TitleInput = styled(Input)`
  text-transform: capitalize;
`;
