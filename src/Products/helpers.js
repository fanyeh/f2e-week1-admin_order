import faker from 'faker';
import moment from 'moment';

export const formDataToObject = ({ current }) => {
  const formData = new FormData(current);
  let object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
};

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const objectToArray = obj => {
  return Object.entries(obj).map(e => Object.assign(e[1], { key: e[0] }));
};

const setRecordDate = () => {
  const orderDate = moment()
    .subtract(faker.random.number({ min: 1, max: 5 }), 'days')
    .subtract(faker.random.number({ min: 1, max: 12 }), 'hours')
    .subtract(faker.random.number({ min: 1, max: 59 }), 'minutes');

  const checkoutDate = orderDate
    .clone()
    .add(faker.random.number({ min: 2, max: 8 }), 'hours')
    .subtract(faker.random.number({ min: 1, max: 60 }), 'minutes');

  const date = {
    order: {
      date: orderDate.format('YYYY-MM-DD'),
      time: orderDate.format('hh:mm'),
    },
    checkout: {
      date: checkoutDate.format('YYYY-MM-DD'),
      time: checkoutDate.format('hh:mm'),
    },
  };
  return date;
};

export const recordCreator = (count = 1, statusCount) => {
  let records = [];

  for (let i = 0; i < count; i++) {
    let productList = [];
    let total = 0;
    for (let i = 0; i < faker.random.number({ min: 1, max: 5 }); i++) {
      const list = {
        name: faker.lorem.words(),
        qty: faker.random.number({ min: 1, max: 5 }),
        price: Math.floor(faker.commerce.price(400, 3000, 0) / 100) * 100,
      };
      total += list.qty * list.price;
      productList.push(list);
    }
    records.push({
      name: faker.name.findName(),
      date: setRecordDate(),
      address: {
        main: faker.address.streetAddress(),
        second: faker.address.secondaryAddress(),
      },
      productList,
      total,
      statusIndex: faker.random.number(statusCount - 1),
    });
  }

  return records;
};

export const chartData = () => {
  let labels = [];
  let totalRevenue = [];
  let totalCost = [];
  let totalIncome = [];
  let date = moment();
  for (let i = 0; i < 7; i++) {
    labels.push(date.format('D MMMM'));
    date.add(1, 'days');
    const reveune = faker.commerce.price(10000, 20000, 0);
    const cost = faker.commerce.price(3000, 10000, 0);
    const income = reveune - cost;
    totalRevenue.push(reveune);
    totalCost.push(cost);
    totalIncome.push(income);
  }

  return {
    labels,
    totalCost,
    totalRevenue,
    totalIncome,
    borderWidth: 3,
  };
};
