import React, { Component } from 'react';
import styled from 'styled-components';
import faker from 'faker';
class LatestOrderItem extends Component {
  render() {
    return (
      <Wrapper>
        {/* <img src={faker.image.fashion(100, 100)} alt="" /> */}
        <Detail>
          <h3>Title</h3>
          <DetailItem>
            <i className="fas fa-clock" />
            <span>2018/06/13 21:42</span>
            <span>Total</span>
          </DetailItem>
          <DetailItem>
            <i className="fas fa-male" />
            <span>Name</span>
            <span>2,800</span>
          </DetailItem>
        </Detail>
      </Wrapper>
    );
  }
}

export default LatestOrderItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 0.5rem;
  padding-top: 1.5rem;
  text-align: left;
  & > img {
    max-height: 100px;
  }
`;

const Detail = styled.div`
  flex-grow: 1;
  & > h3 {
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
  margin-left: 0.5rem;
`;

const DetailItem = styled.div`
  margin-top: 0.5rem;
  & > i {
    margin-right: 0.5rem;
    width: 16px;
    text-align: center;
    color: #757575;
  }
  & > span:first-of-type {
    color: #9b9b9b;
    padding-left: 0.5rem;
    padding-right: 1.5rem;
  }
  & > span:last-child {
    float: right;
    font-weight: 700;
  }
`;
