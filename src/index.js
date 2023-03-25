import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderImages } from './js/renderImages';
import { Notify } from 'notiflix';

const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const results = document.querySelector('.results');
const axios = require('axios');
let page = 1;
let limit = 40; //per_page
let totalPages = 0;
let totalHits;
let searchQuery;
let observer = new IntersectionObserver(entries => {
  if (entries[0].intersectionRatio <= 0 || totalPages === 0) {
    return;
  }
  handleLoadMore();
});

observer.observe(loadMoreButton);

const lightbox = new SimpleLightbox('.results a', {
  captionsData: 'alt',
});

searchForm.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', handleLoadMore);

function updateLoadMoreButton() {
  if (page < totalPages) {
    loadMoreButton.classList.add('active');
  } else {
    loadMoreButton.classList.remove('active');
  }
}

function clearSearchResults() {
  results.innerHTML = '';
}

async function handleSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.searchQuery.value;
  clearSearchResults();
  page = 1;
  await fetchImages(searchQuery);
  updateLoadMoreButton();
  if (totalHits === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}

async function handleLoadMore() {
  if (page >= totalPages) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
  page++;
  await fetchImages(searchQuery);
  updateLoadMoreButton();
}

async function fetchImages(searchQuery) {
  try {
    const response = await axios.get('https://pixabay.com/api/?', {
      params: {
        key: '34705219-9da54ac0294187b037daf6e50',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: limit,
        page: page,
      },
    });
    const data = JSON.parse(response.request.response);
    totalPages = Math.round(data.totalHits / limit);
    totalHits = data.totalHits;
    renderImages(data.hits);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}
