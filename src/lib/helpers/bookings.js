import filter from 'lodash/filter';
import first from 'lodash/first';
import get from 'lodash/get';
import moment from 'moment';
import 'moment-timezone';
import { BOOKING_STATUSES } from '../constants';

export const getBookingStatusTitle = id => {
  const statusFiltered = first(
    filter(BOOKING_STATUSES, status => status.val == id)
  );
  return get(statusFiltered, 'title', '');
};

export const getBookingStatusSearchParams = statusArray => {
  let params = '';
  statusArray.forEach(status => {
    params += `&status=${status.val}`;
  });

  return params;
};

export const getWeekDate = dayINeed => {
  if (moment().isoWeekday() <= dayINeed) {
    return moment().isoWeekday(dayINeed);
  }
  return moment()
    .add(1, 'weeks')
    .isoWeekday(dayINeed);
};

export const getExpiryTime = receivedBookingDetails => {
  let expiryTime = moment(receivedBookingDetails.slot.startTime).tz(
    receivedBookingDetails.slot.timezone
  );
  if (receivedBookingDetails.slot.closure) {
    expiryTime.subtract(receivedBookingDetails.slot.closure, 'hours');
  }

  const paymentHrs = receivedBookingDetails.host.paymentHrs
    .map(p => {
      if (p.status) {
        const current = getWeekDate(p.day);
        if (p.fullDay) {
          current.set({
            hour: 23,
            minute: 59,
            second: 59,
            millisecond: 0
          });
        } else {
          const tempEnd = moment(p.endTime).tz(
            receivedBookingDetails.slot.timezone
          );
          current.set({ hour: tempEnd.hours(), minute: tempEnd.minutes() });
        }
        if (current.format('L') <= moment(expiryTime).format('L')) {
          return current;
        }
      }
      return null;
    })
    .filter(p => p)
    .sort((a, b) => a.valueOf() - b.valueOf());

  if (
    paymentHrs.length &&
    expiryTime.diff(paymentHrs[paymentHrs.length - 1]) >= 0
  ) {
    expiryTime = moment(
      paymentHrs[paymentHrs.length - 1].format('YYYY-MM-DDTHH:mm:ssZ')
    );
  }
  return expiryTime;
};

export const canCollectPayment = receivedBookingDetails => {
  let canCollect = true;
  receivedBookingDetails.statusHistory.forEach(element => {
    if (element.status === BOOKING_STATUSES.PAYMENT_CONFIRMED.val) {
      canCollect = false;
    }
  });
  if (
    receivedBookingDetails.status === BOOKING_STATUSES.PAYMENT_CONFIRMED.val ||
    receivedBookingDetails.status === BOOKING_STATUSES.BOOKING_EXPIRED.val ||
    receivedBookingDetails.status === BOOKING_STATUSES.BOOKING_COMPLETED.val ||
    receivedBookingDetails.status === BOOKING_STATUSES.PENDING_SETTLEMENT.val ||
    receivedBookingDetails.status ===
      BOOKING_STATUSES.PENDING_CONFIRMATION.val ||
    receivedBookingDetails.status === BOOKING_STATUSES.BOOKING_CANCELLED.val
  ) {
    canCollect = false;
  }
  return canCollect;
};

export const showExpiry = receivedBookingDetails => {
  if (!canCollectPayment(receivedBookingDetails)) {
    return false;
  }
  const expiryTime = getExpiryTime(receivedBookingDetails);
  if (expiryTime.diff(moment()) >= 0) {
    return true;
  }
  return false;
};
