'use strict';
// -------------------------------------------------------------------------------------------------------------------------------------------
// 1. Create a function 'whereAmI', input ('lat', 'lng') & perform reverse geocoding to retrieve city details
const API_KEY = '115085540315398e15987151x103927';

const printCountryInfo = function (data) {
  let countryMsg = `You are in ${data.city}, ${data.country}`;
  console.log(countryMsg);
};

const whereAmI = function (lat, lng) {
  const url = `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`;
  fetch(url)
    .then(res => {
      if (!res.ok)
        throw new Error('Unable to retrieve info from provided coordinates.');
      console.log(res);
      return res.json();
    })
    .then(data => {
      printCountryInfo(data);
    })
    .catch(err => {
      console.log(err.message);
    });
};

whereAmI(52.508, 13.381);
// -------------------------------------------------------------------------------------------------------------------------------------------
