import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class Checkbox extends Component {
  static defaultProps = {
    checked: true,
  };
  state = { checked: this.props.checked, id: btoa(Date.now()) };
  changeHandler = e => {
    this.setState(({ checked }) => ({ checked: !checked }));
    const trigger = this.props.trigger;
    if (trigger) {
      trigger();
    }
  };
  render() {
    return (
      <Wrapper>
        <StyledCheckbox
          type="checkbox"
          checked={this.state.checked}
          onChange={this.changeHandler}
          id={this.state.id}
        />
        <StyledCheckmark htmlFor={this.state.id} arrow={this.props.noarrow ? false : true} />
      </Wrapper>
    );
  }
}

export default Checkbox;

const Wrapper = styled.div`
  display: inline-block;
`;

const StyledCheckmark = styled.label`
  position: relative;
  height: 1rem;
  width: 1rem;
  background-color: white;
  border-radius: 3px;
  display: block;
  cursor: pointer;
  margin-right: ${props => (props.arrow ? '2.25rem' : '1rem')};
  border: 1px solid black;

  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 3px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

    


  &:before {
    ${props =>
      props.arrow &&
      css`
        content: '';
        position: absolute;
        right: -1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
      `}
`;

const StyledCheckbox = styled.input`
  position: absolute;
  display: none;
  &:checked ~ ${StyledCheckmark} {
    background-color: black;
  }
  &:checked ~ ${StyledCheckmark}:after {
    display: block;
  }
`;
