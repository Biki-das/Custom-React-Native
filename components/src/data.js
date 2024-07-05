import dayjs from 'dayjs';
import {faker} from '@faker-js/faker';

const startOfDay = dayjs().startOf('day').set('minutes', 0).set('seconds', 0);

faker.seed(10);
const data = [...Array((24 * 60) / 15).keys()].map(value => {
  const addZero = Math.floor(value / 4) < 10 ? '0' : '';
  const arriveAt = startOfDay.add(value * 15, 'minutes');
  const duration = faker.datatype.number(39) + 20;
  const departAt = arriveAt.subtract(duration, 'minutes');
  return {
    // label: `${addZero}${Math.floor(value / 4)}:${value % 4 === 0 ? '0': ''}${((value % 4) * 15)}`,
    key: faker.datatype.uuid(),
    departAt: departAt.format('hh:mm a'),
    arriveAt: arriveAt.format('hh:mm a'),
    duration,
  };
});

export default data;
