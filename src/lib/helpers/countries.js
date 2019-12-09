export const formatCountries = countries => {
  const tempCountries = countries.result;
  tempCountries.forEach(country => {
    country.id = country.dialCode;
    country.name = country.title;
    if (country.cities) {
      country.cities.forEach(city => {
        city.id = city.dialCode;
        city.name = city.title;
      });
    }
  });
  return tempCountries;
};

export const getCountry = (countries, code) => countries.filter(country => country.dialCode === code)[0];

export const getCity = (countries, countryCode, cityCode) => countries
  .filter(country => country.dialCode === countryCode)[0]
  .cities.filter(city => city.dialCode === cityCode)[0];

export const getSelectedCountriesCities = (code, countriesList) => {
  if (countriesList) {
    return countriesList.filter(country => country.dialCode === code)[0].cities;
  }
  return [];
};

export const getCityTitle = (countryCode, cityCode, countriesList) => countriesList
  .filter(country => country.dialCode === countryCode)[0]
  .cities.filter(city => city.dialCode === cityCode)[0].title;

export const getCountryTitle = (code, countriesList) => countriesList.filter(country => country.dialCode === code)[0].title;
