import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
class TransationItem extends Component {
  render() {
    const { up, icon, amount, name, percentage } = this.props;
    return (
      <Wrapper up={up}>
        <i className={classNames('fab ', icon)} />
        <span>{name}</span>
        <span>{amount}</span>
        <i className={classNames('fas', up ? 'fa-arrow-up' : 'fa-arrow-down')} />
        <span>{percentage}</span>
      </Wrapper>
    );
  }
}

export default TransationItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #ebebeb;

  &:last-of-type {
    border-bottom: none;
  }
  & > i:first-child {
    font-size: 2.8rem;
    margin-right: 1.25rem;
  }
  & > span:nth-of-type(1) {
    color: #9b9b9b;
    margin-right: 1.25rem;
    flex-grow: 1;
  }
  & > span:nth-of-type(2) {
    font-size: 1.25rem;
    margin-right: 1.25rem;
  }
  & > i:last-of-type {
    margin-right: 0.5rem;
    color: ${props => (props.up ? '#7ED321' : '#D0021B')};
  }
  & > span:last-of-type {
    color: ${props => (props.up ? '#7ED321' : '#D0021B')};
  }
`;
