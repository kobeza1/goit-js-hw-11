import { ApiService } from './utils/api-service';
import { renderImages } from './utils/render';
import { Notify } from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const apiService = new ApiService();
const lightbox = new simpleLightbox('.gallery a', {
  captionDelay: 250,
  docClose: false,
});

let imagesValue = 0;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();
  try {
    apiService.query = event.currentTarget.elements.searchQuery.value;
    apiService.resetPage();

    const [hits, totalHits] = await apiService.fetchImages();
    Notify.success(`Hooray! We've found ${totalHits} images.`);
    imagesValue = hits.length;
    apiService.totalImages = totalHits;
    const markup = await renderImages(hits);
    refs.gallery.innerHTML = markup;

    refs.loadMoreBtn.classList.remove('visually-hidden');
    lightbox.refresh();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function onLoadMoreBtnClick() {
  if (imagesValue >= apiService.totalImages) {
    refs.loadMoreBtn.classList.add('visually-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  apiService.incrementPage();
  const [hits, totalHits] = await apiService.fetchImages();
  imagesValue += hits.length;
  console.log(imagesValue);

  const markup = await renderImages(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  lightbox.refresh();
}
