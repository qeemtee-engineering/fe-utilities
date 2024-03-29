import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

export const getFormattedLocation = location => {
  let addressLinesCombined = '';
  location.addressLines.forEach(line => {
    return line ? (addressLinesCombined += line + ', ') : '';
  });
  return `${addressLinesCombined} ${location.city}, ${location.country} `;
};

export const getLocationUrl = location => {
  return `https://www.google.com/maps?z=12&t=m&q=loc:${location.lat}+${location.lng}`;
};

export const isWithinRadius = (checkPoint, centerPoint, km) => {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export const getPickUpLocation = (activity, currentBooking, hostdata) => {
  if (
    get(currentBooking, 'pickUp.isAvailable') &&
    get(currentBooking, 'pickUp.radius')
  ) {
    return currentBooking.pickUp;
  }

  if (get(activity, 'pickUp.isAvailable')) {
    // Set default pickup to base pickup set by merchant
    let pickUp = cloneDeep(activity.pickUp);

    if (get(activity, 'pickUp.radius')) {
      // Per new schema
      // Check if host address falls within pickUp radius
      // Set default pickup to host address
      if (
        isWithinRadius(
          get(hostdata, 'address'),
          get(activity, 'pickUp.location'),
          get(activity, 'pickUp.radius')
        )
      ) {
        pickUp['location']['lat'] = get(hostdata, 'address').lat;
        pickUp['location']['lng'] = get(hostdata, 'address').lng;
        pickUp['location']['fullAddress'] = get(
          hostdata,
          'address.fullAddress'
        );

        pickUp['location']['url'] = getLocationUrl(get(hostdata, 'address'));
      } else if (
        (get(activity, 'pickUp.location'), get(activity, 'pickUp.radius'))
      ) {
        // Set location url to default merchant base pickup location
        pickUp['location']['url'] = getLocationUrl(
          get(activity, 'pickUp.location')
        );
      }
    } else if (get(hostdata, 'address')) {
      pickUp['location'] = {
        fullAddress: get(hostdata, 'address.fullAddress'),
        url: getLocationUrl(get(hostdata, 'address')),
        lat: get(hostdata, 'address').lat,
        lng: get(hostdata, 'address').lng
      };
    }

    return pickUp;
  }

  return null;
};
