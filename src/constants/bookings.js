// BOOKING STATUSES
export const BOOKING_STATUSES = {
  RESERVED: {
    val: 0,
    title: 'Reserved'
  },
  PAYMENT_CONFIRMED: {
    val: 1,
    title: 'Confirmed'
  },
  PAYMENT_DECLINED: {
    val: 2,
    title: 'Declined'
  },
  BOOKING_EXPIRED: {
    val: 3,
    title: 'Expired'
  },
  BOOKING_RESCHEDULED: {
    val: 4,
    title: 'Rescheduled'
  },
  BOOKING_CANCELLED: {
    val: 5,
    title: 'Cancelled'
  },
  BOOKING_IN_PROGRESS: {
    val: 6,
    title: 'In Progress'
  },
  BOOKING_COMPLETED: {
    val: 7,
    title: 'Completed'
  },
  PAYMENT_REFUNDED: {
    val: 8,
    title: 'Refunded'
  },
  AWAITING_GATEWAY_PAYMENT: {
    val: 9,
    title: 'Awaiting Gateway Payment'
  },
  RECONCILIATION_PENDING: {
    val: 10,
    title: 'Reconciliation Pending'
  },
  PAYMENT_RECONCILED_HOST: {
    val: 11,
    title: 'Reconciled Host'
  },
  PAYMENT_RECONCILED_MERCHANT: {
    val: 12,
    title: 'Reconciled Merchant'
  },
  PAYMENT_RECONCILED: {
    val: 13,
    title: 'Reconciled'
  },
  AWAITING_HOST_PAYMENT: {
    val: 14,
    title: 'Awaiting Host Payment'
  },
  PENDING_HOST_PAYMENT_VERIFICATION: {
    val: 15,
    title: 'Pending Host Payment Verification'
  },
  HOST_PAYMENT_RECEIVED: {
    val: 16,
    title: 'Host Payment Received'
  },
  MERCHANT_AWAITING_PAYMENT: {
    val: 17,
    title: 'Merchant Awaiting Payment'
  },
  MERCHANT_PAYMENT_SENT: {
    val: 18,
    title: 'Merchant Payment Sent'
  },
  PENDING_SETTLEMENT: {
    val: 19,
    title: 'Pending Settlement'
  },
  PENDING_CONFIRMATION: {
    val: 20,
    title: 'Pending Confirmation'
  },
  SETTLEMENT_COMPLETE: {
    val: 21,
    title: 'Settlement Complete'
  },
  INVOICE_RAISED: {
    val: 22,
    title: 'Invoice Raised'
  }
};

export const ADMIN_BOOKING_FILTER_STATUSES = [
  BOOKING_STATUSES.RESERVED,
  BOOKING_STATUSES.PAYMENT_CONFIRMED,
  BOOKING_STATUSES.PAYMENT_DECLINED,
  BOOKING_STATUSES.BOOKING_EXPIRED,
  BOOKING_STATUSES.BOOKING_RESCHEDULED,
  BOOKING_STATUSES.BOOKING_CANCELLED,
  BOOKING_STATUSES.BOOKING_IN_PROGRESS,
  BOOKING_STATUSES.BOOKING_COMPLETED,
  BOOKING_STATUSES.PAYMENT_REFUNDED,
  BOOKING_STATUSES.AWAITING_HOST_PAYMENT,
  BOOKING_STATUSES.PENDING_SETTLEMENT,
  BOOKING_STATUSES.PENDING_CONFIRMATION,
  BOOKING_STATUSES.SETTLEMENT_COMPLETE,
  BOOKING_STATUSES.INVOICE_RAISED
];

export const HOST_BOOKING_FILTER_STATUSES = [
  BOOKING_STATUSES.RESERVED,
  BOOKING_STATUSES.PAYMENT_CONFIRMED,
  BOOKING_STATUSES.PAYMENT_DECLINED,
  BOOKING_STATUSES.BOOKING_EXPIRED,
  BOOKING_STATUSES.BOOKING_RESCHEDULED,
  BOOKING_STATUSES.BOOKING_CANCELLED,
  BOOKING_STATUSES.BOOKING_IN_PROGRESS,
  BOOKING_STATUSES.BOOKING_COMPLETED,
  BOOKING_STATUSES.PAYMENT_REFUNDED,
  BOOKING_STATUSES.AWAITING_HOST_PAYMENT,
  BOOKING_STATUSES.PENDING_SETTLEMENT,
  BOOKING_STATUSES.PENDING_CONFIRMATION,
  BOOKING_STATUSES.SETTLEMENT_COMPLETE,
  BOOKING_STATUSES.INVOICE_RAISED
];

export const MERCHANT_BOOKING_FILTER_STATUSES = [
  BOOKING_STATUSES.PAYMENT_CONFIRMED,
  BOOKING_STATUSES.PAYMENT_DECLINED,
  BOOKING_STATUSES.BOOKING_RESCHEDULED,
  BOOKING_STATUSES.BOOKING_CANCELLED,
  BOOKING_STATUSES.BOOKING_IN_PROGRESS,
  BOOKING_STATUSES.BOOKING_COMPLETED,
  BOOKING_STATUSES.PAYMENT_REFUNDED,
  BOOKING_STATUSES.AWAITING_HOST_PAYMENT,
  BOOKING_STATUSES.PENDING_SETTLEMENT,
  BOOKING_STATUSES.PENDING_CONFIRMATION,
  BOOKING_STATUSES.SETTLEMENT_COMPLETE,
  BOOKING_STATUSES.INVOICE_RAISED
];

export const PRICING_TIER = {
  TIER_ADULT: 'adult',
  TIER_CHILDREN: 'children',
  TIER_SENIOR_CITIZEN: 'seniorCitizen',
  TIER_MILITARY: 'military',
  TIER_INFANT: 'infant',
  TIER_MINOR: 'minor'
};

export const COMMISSION_MIN = 10;
export const COMMISSION_MAX = 30;
export const HOST_COMMISSION_MIN = 50;
export const HOST_COMMISSION_MAX = 100;
export const DMC_COMMISSION_MIN = 0;
export const DMC_COMMISSION_MAX = 50;