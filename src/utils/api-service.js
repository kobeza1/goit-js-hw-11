import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages(searchQuery) {
    const params = {
      key: '30145773-0177bd10e0844ac367565a7b9',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    };
    const {
      data: { hits, totalHits },
    } = await axios.get(`${BASE_URL}`, { params });
    return hits;
  }

  incrementPage() {
    this.page += 1;
  }
}
