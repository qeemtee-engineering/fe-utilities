import get from 'lodash/get';

export const getPhoneNumber = data => {
  if (get(data, 'phoneNumber')) {
    return `+${data.phoneNumber.countryCode}-${data.phoneNumber.nationalNumber}`;
  } else if (get(data, 'countryCode') && get(data, 'phone')) {
    return `+${data.countryCode}-${data.phone}`;
  } else if (get(data, 'phone')) {
    return `${data.phone}`;
  } else if (get(data, 'countryCode') && get(data, 'nationalNumber')) {
    return `+${data.countryCode}-${data.nationalNumber}`;
  }
  return 'N/A';
};
