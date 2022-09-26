import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async fetchImages() {
    const params = {
      key: '30145773-0177bd10e0844ac367565a7b9',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    };
    const {
      data: { hits, totalHits },
    } = await axios.get(`${BASE_URL}`, { params });
    if (!hits.length) {
      throw new Error();
    }
    return [hits, totalHits];
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get totalImages() {
    return this.totalHits;
  }

  set totalImages(newCount) {
    this.totalHits = newCount;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
