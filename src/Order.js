import React, { Component } from 'react';
import styled from 'styled-components';
import { recordCreator } from './Products/helpers';
import Menu from './Products/Menu';
import MenuButton from './Products/MenuButton';
import Checkbox from './Products/Checkbox';

const headers = [
  { key: 'cust', name: 'Customer' },
  { key: 'plist', name: 'Product List' },
  { key: 'total', name: 'Total' },
  { key: 'cart', name: 'Add To Cart' },
  { key: 'check', name: 'Check-out' },
  { key: 'addr', name: 'Address' },
  { key: 'status', name: 'Status' },
];

const headerChecks = () => {
  let obj = {};
  headers.forEach(header => {
    obj[header.key] = true;
  });
  return obj;
};

const status = ['paid', 'unpaid', 'done', 'shipping'];
class Order extends Component {
  state = { records: recordCreator(5, status.length), checks: headerChecks() };

  formatAmount = amount => {
    return `$${new Intl.NumberFormat('en').format(amount)}`;
  };

  changeHandler = key => {
    const { checks } = this.state;
    checks[key] = !checks[key];
    this.setState({ checks });
  };

  render() {
    const { checks } = this.state;
    return (
      <Wrapper>
        <Control>
          <div>
            <Checkbox />
            <Menu>{status}</Menu>
          </div>
          <MenuButton name="edit section" type="edit">
            {headers.map(header => (
              <MenuItem key={header.key} onClick={e => e.stopPropagation()}>
                <Checkbox noarrow trigger={() => this.changeHandler(header.key)} />
                <HeaderName>{header.name}</HeaderName>
              </MenuItem>
            ))}
          </MenuButton>
        </Control>

        <StyledTable>
          <thead>
            <tr>
              {headers.map(header => (
                <TableHeader check={checks[header.key]} key={header.key}>
                  {header.name}
                </TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(record => (
              <tr key={record.id}>
                <TableCell check={checks[headers[0].key]}>{record.name}</TableCell>
                <TableCell check={checks[headers[1].key]}>
                  {record.productList.map(product => (
                    <Product key={product.id}>
                      <div>{product.name}</div>
                      <Flex>
                        <div>{this.formatAmount(product.price)}</div>
                        <div>{product.qty}</div>
                      </Flex>
                    </Product>
                  ))}
                </TableCell>
                <TableCell check={checks[headers[2].key]}>
                  {this.formatAmount(record.total)}
                </TableCell>
                <TableCell check={checks[headers[3].key]}>
                  <div>{record.date.order.date}</div>
                  <span>{record.date.order.time}</span>
                </TableCell>
                <TableCell check={checks[headers[4].key]}>
                  <div>{record.date.checkout.date}</div>
                  <span>{record.date.checkout.time}</span>
                </TableCell>
                <TableCell check={checks[headers[5].key]}>
                  <div>
                    <div>{record.address.main}</div>
                    <span>{record.address.second}</span>
                  </div>
                </TableCell>
                <TableCell check={checks[headers[6].key]}>
                  <MenuButton type={status[record.statusIndex]} name={status[record.statusIndex]}>
                    {status.map((type, index) => (
                      <StatusItem onClick={e => e.stopPropagation()} key={index}>
                        {type}
                      </StatusItem>
                    ))}
                  </MenuButton>
                </TableCell>
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

const TableHeader = styled.th`
  display: ${props => (props.check ? 'table-cell' : 'none')};
`;
const TableCell = styled.td`
  display: ${props => (props.check ? 'table-cell' : 'none')};
`;
