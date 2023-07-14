import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38126505-a6f53156a171e6bf3f658f7c1';

export default class PixabayApiService {
  searchQuery = '';
  page = 1;

  async fetchArticles() {
    const urlAxiosKey = `?key=${API_KEY}`;

    const { data } = await axios.get(urlAxiosKey, {
      params: {
        page: this.page,
        q: this.searchQuery,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
