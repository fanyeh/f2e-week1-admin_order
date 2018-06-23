import React, { Component } from 'react';
import { Input, Label, Select, LabelContainer } from '../../components/InputStyles';
import faker from 'faker';
import styled from 'styled-components';
class SpecInputs extends Component {
  state = { inventory: faker.commerce.price(0, 10, 0), color: faker.commerce.color() };

  colorHandler = e => {
    this.setState({ color: e.target.value });
  };
  inventoryHandler = e => {
    this.setState({ inventory: e.target.value });
  };
  render() {
    const { inventory, color } = this.state;
    return (
      <form ref={this.props.specRef}>
        <LabelContainer>
          <Label title="Size" small>
            <Select name="size">
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="S">S</option>
            </Select>
          </Label>
          <Label title="Color">
            <ColorInput type="text" name="color" value={color} onChange={this.colorHandler} />
          </Label>
          <Label title="Inventory">
            <Input
              type="number"
              name="inventory"
              value={inventory}
              onChange={this.inventoryHandler}
            />
          </Label>
        </LabelContainer>
      </form>
    );
  }
}

export default SpecInputs;

const ColorInput = styled(Input)`
  text-transform: capitalize;
`;
