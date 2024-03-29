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

export const canModifyBookingAdmin = bookingObj => {
  if (
    [
      BOOKING_STATUSES.BOOKING_RESCHEDULED.val,
      BOOKING_STATUSES.BOOKING_IN_PROGRESS.val,
      BOOKING_STATUSES.PAYMENT_CONFIRMED.val
    ].includes(bookingObj.status)
  ) {
    return true;
  }
  return false;
};

export const canCancelBookingAdmin = bookingObj => {
  if (bookingObj.status < BOOKING_STATUSES.PAYMENT_CONFIRMED.val) {
    return false;
  }

  if (
    bookingObj.status === BOOKING_STATUSES.BOOKING_CANCELLED.val &&
    bookingObj.payment.hostCashData
  ) {
    return false;
  }

  if (
    [
      BOOKING_STATUSES.BOOKING_RESCHEDULED.val,
      BOOKING_STATUSES.BOOKING_IN_PROGRESS.val,
      BOOKING_STATUSES.PAYMENT_CONFIRMED.val,
      BOOKING_STATUSES.PENDING_SETTLEMENT.val
    ].includes(bookingObj.status)
  ) {
    return true;
  }
  return false;
};

export const canModifyBooking = bookingObj => {
  const isBookingAlreadyModified = get(bookingObj, 'slot.rescheduledSlot');
  if (
    bookingObj.status !== BOOKING_STATUSES.PAYMENT_CONFIRMED.val ||
    isBookingAlreadyModified
  ) {
    return false;
  }
  if (get(bookingObj, 'slot.rescheduleHrs.isAllowed')) {
    let slotTime = moment(bookingObj.slot.startTime);
    let currTime = moment();
    var duration = moment.duration(slotTime.diff(currTime));
    var hours = duration.asHours();
    if (hours > bookingObj.slot.rescheduleHrs.hrs) {
      return true;
    }
    return false;
  }
  return false;
};

export const canCancelBooking = bookingObj => {
  if (
    bookingObj.status === BOOKING_STATUSES.BOOKING_CANCELLED.val &&
    bookingObj.payment.hostCashData
  ) {
    return true;
  }
  if (bookingObj.status !== BOOKING_STATUSES.PAYMENT_CONFIRMED.val) {
    return false;
  }
  if (get(bookingObj, 'slot.cancellationHrs.isAllowed')) {
    let slotTime = moment(bookingObj.slot.startTime);
    let currTime = moment();
    var duration = moment.duration(slotTime.diff(currTime));
    var hours = duration.asHours();
    if (hours > bookingObj.slot.cancellationHrs.hrs) {
      return true;
    }
    return false;
  }
  return false;
};

export const getModifiedSlots = (slots, activityDetails) => {
  let modifiedDatesArray = [];
  const showDuration = ['fullDay', 'halfDay', 'session'].includes(
    activityDetails.subCategory
  );
  slots.forEach(slot => {
    let startTime = moment(slot.startTime).tz(slot.timezone);
    let endTime = slot.endTime
      ? moment(slot.endTime).tz(slot.timezone)
      : startTime.clone().add(Number(slot.duration), 'hours');
    let selectedSlotArray = currentDateExist(startTime.clone());
    let partOfDay = slot.partOfDay ? slot.partOfDay : null;

    if (
      showDuration &&
      passesCurrentDay(startTime, slot.duration) &&
      activityDetails.subCategory === 'session'
    ) {
      endTime = slot.endTime
        ? moment(slot.endTime).tz(slot.timezone)
        : moment(startTime)
            .add(activityDetails.activityTime, 'hours')
            .tz(slot.timezone);
    }

    const slotObj = {
      closure: slot.closure,
      timezone: slot.timezone,
      startTimeDate: startTime.clone(),
      startTime: get(activityDetails, 'pickUp.isAvailable')
        ? `${startTime.format('hh:mm a')} - ${startTime
            .add('30', 'minutes')
            .format('hh:mm a')}`
        : startTime.format('hh:mm a'),
      endTime: get(activityDetails, 'pickUp.isAvailable')
        ? `${endTime.format('hh:mm a')} - ${endTime
            .add('30', 'minutes')
            .format('hh:mm a')}`
        : endTime.format('hh:mm a'),
      slotId: slot.id,
      partOfDay: partOfDay,
      maxSeats: slot.maxSeats,
      minSeats:
        // If available seats less than min seats, neglect minimum bookings criteria
        slot.availableSeats && slot.availableSeats > slot.minSeats
          ? slot.minSeats
          : null,
      availableSeats: slot.availableSeats,
      rescheduleHrs: slot.rescheduleHrs,
      cancellationHrs: slot.cancellationHrs
    };
    if (selectedSlotArray) {
      selectedSlotArray.push(slotObj);
    } else {
      modifiedDatesArray.push({
        dateToBeDisplayed: startTime.format("DD MMM 'YY"),
        activityId: slot.activityId,
        slots: [slotObj]
      });
    }
  });

  function passesCurrentDay(time, duration) {
    let clonedTime = time.clone();
    clonedTime.add(duration, 'h');
    return !time.isSame(clonedTime, 'day');
  }

  function currentDateExist(d) {
    const formattedDate = d.format('DD MMM YYYY');
    let flag = false;
    modifiedDatesArray.forEach(m => {
      if (
        moment(m.dateToBeDisplayed, 'DD MMM YYYY').format('DD MMM YYYY') ===
        formattedDate
      ) {
        flag = m.slots;
      }
    });
    return flag;
  }

  // Order slots
  function orderSlots(slots) {
    slots = slots.sort(function(a, b) {
      // Sort dates array in ascending order
      return a.startTimeDate - b.startTimeDate;
    });
    return slots;
  }

  modifiedDatesArray = modifiedDatesArray.sort(function(a, b) {
    // Sort dates array in ascending order
    return moment(a.dateToBeDisplayed, "DD MMM 'YY").diff(
      moment(b.dateToBeDisplayed, "DD MMM 'YY")
    );
  });

  const inorderModifiedDatesArray = modifiedDatesArray.map(dates => {
    return {
      ...dates,
      slots: orderSlots(dates.slots)
    };
  });
  return inorderModifiedDatesArray;
};

export const getExpiryTime = payload => {
  if (Object.keys(payload).length) {
    let expiryTime = moment(payload.startTime).tz(payload.timezone);
    if (payload.closure) {
      expiryTime.subtract(payload.closure, 'hours');
    }

    const paymentHrs = payload.paymentHrs
      .map(p => {
        if (p.status) {
          const current = getWeekDate(p.day);
          if (p.fullDay) {
            current.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
          } else {
            const tempEnd = moment(p.endTime).tz(payload.timezone);
            current.set({ hour: tempEnd.hours(), minute: tempEnd.minutes() });
          }
          if (current.format('L') <= moment(expiryTime).format('L')) {
            return current;
          }
        }
        return null;
      })
      .filter(p => p)
      .sort((a, b) => a.diff(b));

    if (
      paymentHrs.length &&
      expiryTime.diff(paymentHrs[paymentHrs.length - 1]) >= 0
    ) {
      expiryTime = paymentHrs[paymentHrs.length - 1];
    }
    return expiryTime;
  }
};
