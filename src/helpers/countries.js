export const formatLocationsList = locations => {
  const tempLocations = locations.result;
  tempLocations.forEach(function(location) {
    location['id'] = location['code'];
    location['name'] = location['title'];
  });
  return tempLocations;
};

export const getCountry = (countries, code) => {
  return countries.filter(country => country.code === code)[0];
};

export const getCity = (cities, cityCode) => {
  return cities.filter(city => city.code === cityCode)[0];
};

export const getCityTitle = (cities, cityCode) => {
  const tempCity = cities.filter(city => city.code === cityCode)[0];
  return tempCity ? tempCity.title : '';
};

export const getCountryTitle = (countriesList, code) => {
  const tempCountry = countriesList.filter(country => country.code === code)[0];
  return tempCountry ? tempCountry.title : '';
};

export const getCountryId = (code, countriesList) => {
  return countriesList.filter(country => country.code === code)[0]['_id'];
};
