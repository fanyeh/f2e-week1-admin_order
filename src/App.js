import React, { Component } from 'react';
import styled from 'styled-components';
import Product from './Product';
import Order from './Order';
import Home from './Home';
import './App.css';

const PageComponents = {
  home: <Home />,
  order: <Order />,
  product: <Product />,
};
class App extends Component {
  state = { currentPage: 'home' };

  changePage = e => {
    this.setState({ currentPage: e.target.id });
  };

  render() {
    const { currentPage } = this.state;
    const PageComponent = PageComponents[currentPage];
    return (
      <div className="App">
        <Header>
          <Nav>
            <span>Shoptime</span>
            <ul onClick={this.changePage}>
              {Object.keys(PageComponents).map(key => (
                <NavItem id={key} key={key} select={currentPage === key}>
                  {key}
                </NavItem>
              ))}
            </ul>
            <span>admin</span>
          </Nav>
        </Header>
        {PageComponent}
      </div>
    );
  }
}

export default App;

const Header = styled.header`
  padding: 1.31rem 2.63rem;
  background: black;
  color: white;
`;

const Nav = styled.nav`
  margin: 0 auto;
  width: 64rem;
  display: flex;
  align-items: baseline;
  text-align: left;
  & > span {
    font-size: 1.5rem;
  }

  & > span:last-of-type {
    font-size: 1rem;
    text-transform: uppercase;
  }

  & > ul {
    width: 100%;
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-left: 4rem;
    text-transform: uppercase;
  }
`;

const NavItem = styled.li`
  display: inline-block;
  list-style: none;
  padding: 0 1rem;
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background: white;
    left: 0;
    bottom: -1.5rem;
    display: ${({ select }) => (select ? 'block' : 'none')};
  }
`;
