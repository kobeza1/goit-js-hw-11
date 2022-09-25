import { ApiService } from './utils/api-service';
import { renderImages } from './utils/render';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const apiService = new ApiService();

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreBtn.classList.remove('visually-hidden');
  const searchQuery = event.currentTarget.elements.searchQuery.value;

  const hits = await apiService.fetchImages(searchQuery);
  const markup = await renderImages(hits);
  refs.gallery.innerHTML = markup.join('');
}

async function onLoadMoreBtnClick() {
  const hits = await fetchImages(searchQuery);
}
