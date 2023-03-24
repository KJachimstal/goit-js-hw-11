import axios from 'axios';

// const searchBox = document.querySelector('#search-form');
// const searchButton = document.querySelector('.search-button');
const searchForm = document.querySelector('.search-form');
const results = document.querySelector('.results');
const axios = require('axios');

searchForm.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  let searchQuery = event.currentTarget.searchQuery.value;

  axios
    .get('https://pixabay.com/api/?', {
      params: {
        key: '34705219-9da54ac0294187b037daf6e50',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    })
    .then(function (response) {
      console.log(JSON.parse(response.request.response));
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
}
