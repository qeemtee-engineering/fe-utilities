import filter from 'lodash/filter';
import first from 'lodash/first';
import get from 'lodash/get';
import { BOOKING_STATUSES } from '../constants';

export const getBookingStatusTitle = id => {
  const statusFiltered = first(filter(BOOKING_STATUSES, status => status.val == id));
  return get(statusFiltered, 'title', '');
};

export const getBookingStatusSearchParams = statusArray => {
  let params = '';
  statusArray.forEach(status => {
    params += `&status=${status.val}`;
  });

  return params;
};
