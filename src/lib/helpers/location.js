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
          get(hostdata, 'office.address'),
          get(activity, 'pickUp.location'),
          get(activity, 'pickUp.radius')
        )
      ) {
        pickUp['location']['lat'] = get(hostdata, 'office.address').lat;
        pickUp['location']['lng'] = get(hostdata, 'office.address').lng;
        pickUp['location']['address'] = getFormattedLocation(
          get(hostdata, 'office.address')
        );
        pickUp['location']['url'] = getLocationUrl(
          get(hostdata, 'office.address')
        );
      } else if (
        (get(activity, 'pickUp.location'), get(activity, 'pickUp.radius'))
      ) {
        // Set location url to default merchant base pickup location
        pickUp['location']['url'] = getLocationUrl(
          get(activity, 'pickUp.location')
        );
      }
    } else if (get(hostdata, 'office.address')) {
      pickUp['location'] = {
        address: getFormattedLocation(get(hostdata, 'office.address')),
        url: getLocationUrl(get(hostdata, 'office.address')),
        lat: get(hostdata, 'office.address').lat,
        lng: get(hostdata, 'office.address').lng
      };
    }

    return pickUp;
  }

  return null;
};

export const isWithinRadius = (checkPoint, centerPoint, km) => {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};
