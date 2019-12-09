import get from 'lodash/get';

export const getPhoneNumber = data => {
  if (get(data, 'phoneNumber')) {
    return `+${data.phoneNumber.countryCode}-${data.phoneNumber.nationalNumber}`;
  } if (get(data, 'countryCode') && get(data, 'phone')) {
    return `+${data.countryCode}-${data.phone}`;
  } if (get(data, 'phone')) {
    return `${data.phone}`;
  } if (get(data, 'countryCode') && get(data, 'nationalNumber')) {
    return `+${data.countryCode}-${data.nationalNumber}`;
  }
  return 'N/A';
};
