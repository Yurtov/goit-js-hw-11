import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38126505-a6f53156a171e6bf3f658f7c1';

// async function getQuery() {
//     try {
//       const response = await axios.get('/user?ID=12345');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }

// export class PixabayAPI {
//   #page = 1;
//   #per_page = 40;
//   #query = '';
//   #totalPages = 0;

//   async getPhotos() {
//     const params = {
//       page: this.#page,
//       q: this.#query,
//       per_page: this.#per_page,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     };

//     const URL_AXIOS = `?key=${API_KEY}`;

//     const { data } = await axios.get(URL_AXIOS, { params });
//     return data;
//   }

//   get query() {
//     this.#query;
//   }

//   set query(newQuery) {
//     this.#query = newQuery;
//   }

//   incrementPage() {
//     this.#page += 1;
//   }

//   resetPage() {
//     this.#page = 1;
//   }

//   setTotal(total) {
//     this.#totalPages = total;
//   }

//   hasMorePhotos() {
//     return this.#page < Math.ceil(this.#totalPages / this.#per_page);
//   }
// }
export default class PixabayApiService {
  // constructor() {
  //   this.searchQuery = '';
  //   this.page = 1;
  // }
  searchQuery = '';
  page = 1;

  async fetchArticles() {
    // const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    // return fetch(url)
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     this.incrementPage();
    //     return hits;
    //   });

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
