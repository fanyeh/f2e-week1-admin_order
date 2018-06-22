import React, { Component } from 'react';
import styled from 'styled-components';
import Toggler from './Toggler';
class Menu extends Component {
  render() {
    return (
      <Toggler>
        {toggler => (
          <StyledMenu
            className="fas fa-tags"
            on={toggler.on}
            onClick={toggler.toggle}
            id={toggler.id}
          >
            <Hint title="Change Status" />
            {toggler.on && (
              <ItemContainer>
                {this.props.children.map((item, index) => <Item kye={index}>{item}</Item>)}
              </ItemContainer>
            )}
          </StyledMenu>
        )}
      </Toggler>
    );
  }
}

export default Menu;
const Hint = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  display: none;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;

  &:after {
    content: attr(title);
    white-space: nowrap;
    position: absolute;
    background: black;
    color: white;
    padding: 0.5rem 0.75rem;
    bottom: -5px;
    left: 50%;
    transform: translate(-50%, 100%);
  }
`;

const ItemContainer = styled.div`
  position: absolute;
  background: white;
  box-shadow: 1px 2px 10px 0 #9b9b9b;
  border-radius: 2px;
  padding: 1rem 0;
  top: 25px;
`;

const Item = styled.div`
  padding: 0.5rem 1.25rem;
  text-transform: uppercase;
  &:hover {
    background: black;
    color: white;
  }
`;

const StyledMenu = styled.i`
  position: relative;
  cursor: pointer;
  &:hover > ${Hint} {
    display: ${props => (props.on ? 'none' : 'block')};
  }
`;
