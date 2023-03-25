import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const results = document.querySelector('.results');
const loadMoreButton = document.querySelectorAll('.load-more');
const axios = require('axios');
let page = 1;

console.log('asdasd');

searchForm.addEventListener('submit', searchImages);
// loadMoreButton.addEventListener('click', loadMoreImages);

// function loadMoreImages() {}

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
        page: page,
      },
    })
    .then(function (response) {
      let data = JSON.parse(response.request.response).hits;
      renderImages(data);
      new SimpleLightbox('.results a', {
        captionsData: 'alt',
      });
      page++;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
}

renderImages(data);
