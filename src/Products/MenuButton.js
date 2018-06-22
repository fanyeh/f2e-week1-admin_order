import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from './Product/InputStyles';
import Toggler from './Toggler';

const color = {
  paid: '#7ED321',
  published: '#7ED321',
  shipping: '#F5A623',
  done: '#4A90E2',
  unpaid: '#9B9B9B',
  unpublished: '#9B9B9B',
  edit: 'black',
};

class MenuButton extends Component {
  render() {
    return (
      <Toggler>
        {toggler => (
          <Wrapper>
            <StyledButton id={toggler.id} onClick={toggler.toggle} color={color[this.props.type]}>
              {this.props.name}
            </StyledButton>
            {toggler.on && (
              <ItemContainer>
                {this.props.children}
                {/* {this.props.children.map((item, index) => <Item key={index}>{item}</Item>)} */}
              </ItemContainer>
            )}
          </Wrapper>
        )}
      </Toggler>
    );
  }
}

export default MenuButton;

const Wrapper = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  position: relative;
  padding-right: 1.5rem;
  background: ${props => props.color};
  /* color: ${props => (props.color === 'none' ? 'black' : 'white')}; */
  /* letter-spacing: ${props => props.color === 'none' && '0'}; */
  &:after {
    content: '';
    position: absolute;
    right: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
  }
`;

const ItemContainer = styled.div`
  position: absolute;
  background: white;
  box-shadow: 1px 2px 10px 0 #9b9b9b;
  border-radius: 2px;
  padding: 1rem 0;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%, 100%);
  z-index: 999;
`;

const Item = styled.div`
  display: flex;
  padding: 0.5rem 1.25rem;
  text-transform: uppercase;
  &:hover {
    background: black;
    color: white;
  }
`;
