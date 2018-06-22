import React, { Component } from 'react';
import styled from 'styled-components';
import { recordCreator } from './Products/helpers';
import Menu from './Products/Menu';
import MenuButton from './Products/MenuButton';
import Checkbox from './Products/Checkbox';

const headers = [
  'Customer',
  'Product List',
  'Total',
  'Add To Cart',
  'Check-out',
  'Address',
  'Status',
];

const status = ['paid', 'unpaid', 'done', 'shipping'];
class Order extends Component {
  state = { records: recordCreator(5, status.length) };

  formatAmount = amount => {
    return `$${new Intl.NumberFormat('en').format(amount)}`;
  };

  render() {
    return (
      <Wrapper>
        <Control>
          <div>
            <Checkbox />
            <Menu>{['Published', 'Unpublished']}</Menu>
          </div>
          <MenuButton name="edit section" type="edit">
            {headers.map(header => (
              <MenuItem onClick={e => e.stopPropagation()}>
                <Checkbox noarrow />
                <HeaderName>{header}</HeaderName>
              </MenuItem>
            ))}
          </MenuButton>
        </Control>

        <StyledTable>
          <thead>
            <tr>{headers.map((header, index) => <th>{header}</th>)}</tr>
          </thead>
          <tbody>
            {this.state.records.map(record => (
              <tr>
                <td>{record.name}</td>
                <td>
                  {record.productList.map(product => (
                    <Product>
                      <div>{product.name}</div>
                      <Flex>
                        <div>{this.formatAmount(product.price)}</div>
                        <div>{product.qty}</div>
                      </Flex>
                    </Product>
                  ))}
                </td>
                <td>{this.formatAmount(record.total)}</td>
                <td>
                  <div>{record.date.order.date}</div>
                  <span>{record.date.order.time}</span>
                </td>
                <td>
                  <div>{record.date.checkout.date}</div>
                  <span>{record.date.checkout.time}</span>
                </td>
                <td>
                  <div>
                    <div>{record.address.main}</div>
                    <span>{record.address.second}</span>
                  </div>
                </td>
                <td>
                  <MenuButton type={status[record.statusIndex]} name={status[record.statusIndex]}>
                    {status.map(header => (
                      <StatusItem onClick={e => e.stopPropagation()}>{header}</StatusItem>
                    ))}
                  </MenuButton>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Wrapper>
    );
  }
}

export default Order;

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    & > thead {
      background-color: white;
    }

    &  th {
      padding:0 1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.8rem;
      text-align:left;
    }
    &  th:nth-of-type(1),th:nth-of-type(3),th:nth-of-type(7) {
      text-align:center;
    }

    & > tbody > tr > td {
      padding: 1.25rem 1rem;
      vertical-align:top;
      font-size:14px;
    }

    & > tbody > tr > td:nth-of-type(2),td:nth-of-type(4),td:nth-of-type(5),td:nth-of-type(6) {
      text-align:left;
    }

    & > tbody > tr {
      text-transform: capitalize;
    }

    & > tbody > tr:nth-of-type(even) {
      background: #ebebeb;
    }
  }
`;

const MenuItem = styled.div`
  display: flex;
  padding: 0.5rem 1.25rem;
  text-transform: uppercase;
`;

const StatusItem = MenuItem.extend`
  &:hover {
    background: black;
    color: white;
  }
`;

const HeaderName = styled.div`
  white-space: nowrap;
`;

const Wrapper = styled.div`
  padding: 1.88rem;
  width: 64rem;
  margin: 0 auto;
  background: #f2f2f2;
`;

const Control = styled.div`
  display: flex;
  margin-bottom: 1rem;
  & > div:first-of-type {
    display: flex;
    align-items: flex-end;
    text-align: left;
    flex-grow: 1;
  }
`;

const Flex = styled.div`
  display: flex;
  padding: 0.25rem 0;

  & > div {
    flex-grow: 1;
  }

  & > div:first-of-type {
    color: #9b9b9b;
  }
  & > div:last-of-type {
    text-align: right;
    padding-right: 1rem;
  }
`;

const Product = styled.div`
  border-bottom: 1px solid white;
  margin-bottom: 0.5rem;
  &:last-of-type {
    border-bottom: none;
  }
`;
