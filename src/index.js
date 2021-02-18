import './styles.css';
import refs from './js/refs';
import country from './templates/one-country.hbs';
import countries from './templates/countries.hbs';
import fetchCountries from './js/fetchCountries';

import debounce from 'lodash.debounce';
import { defaults, info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

defaults.delay = 2000;

refs.inputSearch.addEventListener('input', debounce(searchCountry, 500));

function searchCountry() {
      const inputValue = refs.inputSearch.value;
      refs.markup.innerHTML = '';
  fetchCountries(inputValue)
    .then(renderCountries)
    .catch(error => error); 
}
   
function renderCountries(data) { 
  if (data.status === 404) { 
    return error({
      text: 'Unfortunately the country name you entered is not correct!',
    });
  }
  if (data.length === 1) { 
    countryMarkup(data);
    refs.inputSearch.value = '';
  }

  if (data.length >= 2 && data.length <= 10) { 
    refs.markup.innerHTML = '';
    countriesList(data);
    return info({
      text: 'For more detailed information please specify the query!'
    });
  }

  if (data.length > 10) { 
    return error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}


 function countryMarkup(data) { 
      const textContent = country(data);
      refs.markup.insertAdjacentHTML('beforeend', textContent);
}

function countriesList(data) { 
    const textContent = countries(data);
    refs.markup.insertAdjacentHTML('beforeend', textContent);
}

