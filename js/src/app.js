// import './promises';
import { debounce } from 'lodash-es';
function init() {
  document
    .querySelector('#search')
    .addEventListener('input', debounce(startSearch, 1000));
}

init();

function startSearch(e) {
  const searchTerm = e.target.value;

  if (searchTerm.length < 2) {
    displayLocations([]);
    return;
  }
  fetchLocations(searchTerm).then(displayLocations);
}

async function fetchLocations(searchTerm) {
  try {
    //const response = await fetch(`http://localhost:8000?search=${searchTerm}`);
    const response = await fetch(
      `/.netlify/functions/locations?search=${searchTerm}`
    );
    console.log(response);

    if (!response.ok) {
      throw new Error('Netzwerkfehler!!');
    }

    const locations = await response.json();
    console.log(locations);
    return locations;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function displayLocations(locations) {
  let html = '';
  for (const { place, zipcode } of locations) {
    html += `<li>${place} - ${zipcode}</li>`;
  }
  document.querySelector('.locationsliste').innerHTML = html;
}
