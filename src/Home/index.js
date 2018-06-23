import React, { Component } from 'react';
import styled from 'styled-components';
import TransactionItem from './TransactionItem';
import LastestOrderItem from './LastestOrderItem';
import Toggler from '../Products/Toggler';
import Chart from 'chart.js';
import { chartData } from '../Products/helpers';
class Home extends Component {
  chartRef = React.createRef();
  state = {
    revenue: 0,
    cost: 0,
    income: 0,
  };
  componentDidMount() {
    const data = chartData();
    this.setState({
      revenue: this.calculate(data.totalRevenue),
      cost: this.calculate(data.totalCost),
      income: this.calculate(data.totalIncome),
    });
    let ctx = this.chartRef.current;
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Total Revenue',
            data: data.totalRevenue,
            backgroundColor: 'transparent',
            borderColor: '#7ED321',
            borderWidth: data.borderWidth,
          },
          {
            label: 'Total Cost',
            data: data.totalCost,
            backgroundColor: 'transparent',
            borderColor: '#D0021B',
            borderWidth: data.borderWidth,
          },
          {
            label: 'Net Income',
            data: data.totalIncome,
            backgroundColor: 'transparent',
            borderColor: '#4A90E2',
            borderWidth: data.borderWidth,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        elements: {
          line: {
            tension: 0, // disables bezier curves
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  calculate = amountArr => {
    const total = amountArr.reduce((acc, amount) => acc + amount * 1, 0);
    return `$${new Intl.NumberFormat('en').format(total)}`;
  };

  render() {
    return (
      <Wrapper>
        <Header>
          <h1>Overview</h1>
          <div>
            <span>
              2018/6/6 <i className="fas fa-caret-right" /> 2018/6/13
            </span>
            <Toggler>
              {toggler => (
                <span onClick={toggler.toggle} id={toggler.id}>
                  Weekly<i className="fas fa-caret-down" />
                  {toggler.on && (
                    <ItemContainer>
                      {['Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'].map((item, index) => (
                        <Item key={index}>{item}</Item>
                      ))}
                    </ItemContainer>
                  )}
                </span>
              )}
            </Toggler>
          </div>
        </Header>
        <Flex>
          <Performance>
            <div>
              <i className="fas fa-hand-holding-usd" />
              <h3>Total Revenue</h3>
            </div>
            <Amount color="#7ED321">{this.state.revenue}</Amount>
          </Performance>
          <Performance>
            <div>
              <i className="fas fa-boxes" />
              <h3>Total Cost</h3>
            </div>
            <Amount color="#D0021B">{this.state.cost}</Amount>
          </Performance>
          <Performance>
            <div>
              <i className="fas fa-money-bill" />
              <h3>Net Income</h3>
            </div>
            <Amount color="#4A90E2">{this.state.income}</Amount>
          </Performance>
        </Flex>

        <ChartContainer>
          <canvas width="400" height="200" ref={this.chartRef} />
        </ChartContainer>

        <Flex>
          <Transaction>
            <h1>Transaction Website</h1>
            <TransactionItem
              name="Facebook.com"
              up={true}
              amount="45,836"
              icon="fa-facebook"
              percentage="20%"
            />
            <TransactionItem
              name="Google.com"
              up={true}
              amount="23,582"
              icon="fa-google"
              percentage="12%"
            />
            <TransactionItem
              name="Wechat.com"
              up={false}
              amount="2,489"
              icon="fa-weixin"
              percentage="15%"
            />
            <TransactionItem
              name="Wordpress.com"
              up={false}
              amount="1,057"
              icon="fa-wordpress"
              percentage="30%"
            />
          </Transaction>
          <Transaction>
            <h1>Latest Orders</h1>
            <LastestOrderItem />
            <LastestOrderItem />
            <LastestOrderItem />
          </Transaction>
        </Flex>
      </Wrapper>
    );
  }
}

export default Home;

const ItemContainer = styled.div`
  position: absolute;
  background: white;
  box-shadow: 1px 2px 10px 0 #9b9b9b;
  border-radius: 2px;
  padding: 1rem 0;
  top: 25px;
  right: 0;
`;

const Item = styled.div`
  padding: 0.5rem 1.25rem;
  text-transform: uppercase;
  &:hover {
    background: black;
    color: white;
  }
`;

const Wrapper = styled.div`
  padding: 2.63rem;
  width: 64rem;
  margin: 0 auto;
  background: #f2f2f2;
`;

const Header = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h1 {
    margin: 0;
    display: inline-block;
  }

  & > div > span {
    color: #9b9b9b;
    padding-left: 2rem;
  }

  & > div > span:last-of-type {
    position: relative;
    cursor: pointer;
    user-select: none;
  }
  & > div > span > i {
    color: black;
    padding: 0 0.25rem;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
`;

const Performance = styled.div`
  width: 32%;
  background: white;
  padding: 1.5rem 0;
  text-align: center;
  & > div {
    & > h3 {
      display: inline-block;
      margin: 0;
    }

    & > i {
      font-size: 1.17rem;
      margin-right: 0.5rem;
    }
  }
`;

const Amount = styled.div`
  font-size: 2.25rem;
  margin-top: 1rem;
  color: ${props => props.color};
  font-weight: 900;
`;

const Transaction = styled.div`
  background: white;
  text-align: left;
  padding: 1.88rem;
  width: 43%;
  flex-grow: 0;
  & > h1 {
    margin: 0;
  }
`;

const ChartContainer = styled.div`
  /* height: 25.38rem; */
  padding: 1.5rem;
  background: white;
  margin: 1.25rem 0;
`;
