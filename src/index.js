import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const searchBox = document.querySelector('#search-form');
// const searchButton = document.querySelector('.search-button');
const searchForm = document.querySelector('.search-form');
const results = document.querySelector('.results');
const axios = require('axios');

searchForm.addEventListener('submit', searchImages);
// results.addEventListener('click', onImageClick);

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
      let data = JSON.parse(response.request.response).hits;
      //   console.log(data.length);
      renderImages(data);
      new SimpleLightbox('.results a', {
        captionsData: 'alt',
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
}

function renderImages(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <div class="photo-card">
        <div class="gallery">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        </div>
        <div class="info">
        <p class="info-item">
            <b>Likes: </b></br>${likes}
        </p>
        <p class="info-item">
            <b>Views: </b></br>${views}
        </p>
        <p class="info-item">
            <b>Comments: </b></br>${comments}
        </p>
        <p class="info-item">
            <b>Downloads: </b></br>${downloads}
        </p>
        </div>
      </div>
    `;
      }
    )
    .join('');
  results.innerHTML = markup;
}
