import React, { Component } from 'react';
import firebase from '../firebase';
import styled from 'styled-components';
import { Button } from './Product/InputStyles';
import NewProduct from './NewProduct';
import Menu from './Menu';
import MenuButton from './MenuButton';
import Checkbox from './Checkbox';
class ProductList extends Component {
  state = { products: {}, specs: {}, newProduct: false };

  componentDidMount() {
    firebase
      .database()
      .ref('products/')
      .on('value', productSnapshots => {
        const products = productSnapshots.val();
        let specs = {};
        // Find all spec for each product
        const findSpecs = Object.keys(products).map(id => {
          return firebase
            .database()
            .ref(`specs/${id}/`)
            .once('value');
        });
        // Fetch specs
        Promise.all(findSpecs).then(specSnapshots => {
          specSnapshots.forEach(specSnapshot => {
            specs[specSnapshot.key] = specSnapshot.val();
          });
          this.setState({ products, specs });
        });
      });
  }

  toggleNew = () => {
    this.setState(({ newProduct }) => ({ newProduct: !newProduct }));
  };

  checkHandler = () => {};

  render() {
    const { products, specs, newProduct } = this.state;
    return (
      <Wrapper>
        <Control>
          <div>
            {/* <input type="checkbox" checked onChange={this.checkHandler} /> */}
            <Checkbox />
            <Menu>{['Published', 'Unpublished']}</Menu>
          </div>
          <Button onClick={this.toggleNew}>Add new product +</Button>
        </Control>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Original</th>
              <th>Discount</th>
              <ThFix>Size</ThFix>
              <ThFix>Color</ThFix>
              <ThFix>Inventory</ThFix>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(products).map((pid, index) => (
              <tr key={pid}>
                <Cell>{products[pid].title}</Cell>
                <Cell>${products[pid].original}</Cell>
                <Cell>${products[pid].discount}</Cell>

                <Cell colSpan="3">
                  {Object.keys(specs[pid]).map(size => (
                    <Spec key={size}>
                      <CellFix>{size}</CellFix>
                      <div>
                        {Object.keys(specs[pid][size]).map(sid => (
                          <Flex key={sid}>
                            <CellFix>{specs[pid][size][sid].color}</CellFix>
                            <CellFix>{specs[pid][size][sid].inventory}</CellFix>
                          </Flex>
                        ))}
                      </div>
                    </Spec>
                  ))}
                </Cell>

                <Cell bottom>
                  <MenuButton
                    name={products[pid].isDraft ? 'unpublished' : 'published'}
                    type={products[pid].isDraft ? 'unpublished' : 'published'}
                  >
                    {['published', 'unpublished'].map((item, index) => (
                      <Item key={index}>{item}</Item>
                    ))}
                  </MenuButton>
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>

        {newProduct && <NewProduct handler={this.toggleNew} />}
      </Wrapper>
    );
  }
}

export default ProductList;

const Wrapper = styled.div`
  padding: 1.88rem;
  width: 70%;
  margin: 0 auto;
  background: #f2f2f2;
  & > table {
    border-collapse: collapse;
    width: 100%;
    & > thead {
      background-color: white;
    }

    & th {
      padding-top: 0.5rem;
      padding-bottom: 0.8rem;
    }

    & > tbody > tr > td {
      padding: 1.25rem 0;
    }

    & > tbody > tr {
      text-transform: capitalize;
    }

    & > tbody > tr:nth-of-type(even) {
      background: #ebebeb;
    }
  }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    & > thead {
      background-color: white;
    }

    & th {
      padding-top: 0.5rem;
      padding-bottom: 0.8rem;
    }

    & > tbody > tr > td {
      padding: 1.25rem 0;
    }

    & > tbody > tr {
      text-transform: capitalize;
    }

    & > tbody > tr:nth-of-type(even) {
      background: #ebebeb;
    }
  }
`;

const Flex = styled.div`
  display: flex;

  & > div {
    flex-grow: 1;
  }
`;

const Spec = Flex.extend`
  border-bottom: 1px solid white;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  &:last-of-type {
    border: none;
  }
`;

const Cell = styled.td`
  vertical-align: ${props => (props.bottom ? 'bottom' : 'top')};
`;

const ThFix = styled.th`
  width: 100px;
`;

const CellFix = styled.div`
  width: 100px;
`;

const Control = styled.div`
  display: flex;
  /* align-items: flex-end; */
  margin-bottom: 1rem;
  & > div {
    display: flex;
    align-items: flex-end;
    text-align: left;
    flex-grow: 1;
    & > input {
      margin-right: 1rem;
    }
  }
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
