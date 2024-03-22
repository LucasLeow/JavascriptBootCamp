'use strict';
// -------------------------------------------------------------------------------------------------------------------------------------------
// 1. Create a function 'whereAmI', input ('lat', 'lng') & perform reverse geocoding to retrieve city details
const API_KEY = '115085540315398e15987151x103927';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const printCountryInfo = function (data) {
  let countryMsg = `You are in ${data.city}, ${data.country}`;
  console.log(countryMsg);
};

const renderCountry = function (data, className = '') {
  const html = ` 
          <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
      
              <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${
                data.population
              } people</p>
              <p class="country__row"><span>🗣️</span>${data.languages
                .map(lang_obj => lang_obj.name)
                .join(', ')}</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].code
              }</p>
              </div>
              
        </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (countryName) {
  const countryUrl = `https://restcountries.com/v2/name/${countryName}`;
  fetch(countryUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error('Unable to retrieve country data');
      }
      return res.json();
    })
    .then(data => {
      console.log('country data', data);
      renderCountry(data[0]);

      const neighbour = data[0]?.borders?.[0];
      if (!neighbour) throw new Error('Country has no neighbour');
      const neighbourUrl = `https://restcountries.com/v2/alpha/${neighbour}`;
      fetch(neighbourUrl)
        .then(res => {
          if (!res.ok)
            throw new Error('Unable to retrieve neighbour country data');
          return res.json();
        })
        .then(neighbour_data => renderCountry(neighbour_data, 'neighbour'));
    })
    .catch(err => console.log(err.message));
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
      getCountryData(data.country);
    })
    .catch(err => {
      console.log(err.message);
    });
};

whereAmI(52.508, 13.381);
// -------------------------------------------------------------------------------------------------------------------------------------------
