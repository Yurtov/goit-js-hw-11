import PixabayApiService from './js/api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { showLoader, hideLoader } from './js/loader';
import BtnUp from './js/scrollToTop';

const pixabayApiService = new PixabayApiService();
const btnUp = new BtnUp();
btnUp.addEventListener();

refs.searchFormEl.addEventListener('submit', heandleBtnSearchSubmit);
refs.loadMoreBtnEl.addEventListener('click', heandleBtnLoadMore);
refs.scrollToTopBtnEl.addEventListener('click', scrollToTop);

async function heandleBtnSearchSubmit(e) {
  e.preventDefault();
  scrollToTop();

  pixabayApiService.query = e.target.elements.searchQuery.value;
  if (pixabayApiService.query === '') {
    return Notiflix.Notify.failure(
      'You cannot send an empty request, please write something'
    );
  }

  pixabayApiService.resetPage();

  // pixabayApiService
  //   .fetchArticles()
  //   .then(hits => {
  //     showSpiner();
  //     refs.murkupGalleryContainer.innerHTML = murkupGallery(hits);
  //   })
  //   .catch(console.error('error'))
  //   .finally(hideSpiner(), refs.loadMoreBtnEl.classList.remove('.is-hidden'));

  try {
    showLoader(refs);
    const { hits, total } = await pixabayApiService.fetchArticles();

    if (total === 0) {
      throw new Error();
    }
    Notiflix.Notify.success(`Found ${total} cards matching your request`);
    refs.murkupGalleryContainer.innerHTML = murkupGallery(hits);
    const gallery = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
    });
    refs.loadMoreBtnEl.classList.remove('is-hidden');

    if (
      refs.murkupGalleryContainer.getElementsByTagName('li').length === total
    ) {
      refs.loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    pixabayApiService.incrementPage();
  } catch {
    refs.murkupGalleryContainer.innerHTML = '';
    refs.loadMoreBtnEl.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } finally {
    hideLoader(refs);
  }
}

async function heandleBtnLoadMore() {
  pixabayApiService.incrementPage();

  // pixabayApiService
  //   .fetchArticles()
  //   .then(hits =>
  //     refs.murkupGalleryContainer.insertAdjacentHTML(
  //       'beforeend',
  //       murkupGallery(hits)
  //     )
  //   );

  try {
    showLoader(refs);
    const { hits, total } = await pixabayApiService.fetchArticles();

    if (
      refs.murkupGalleryContainer.getElementsByTagName('li').length === total
    ) {
      refs.loadMoreBtnEl.classList.add('is-hidden');
    }

    refs.murkupGalleryContainer.insertAdjacentHTML(
      'beforeend',
      murkupGallery(hits)
    );
  } catch (err) {
    console.log(err.message);
  } finally {
    hideLoader(refs);
  }
}

function murkupGallery(data) {
  return data
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
        <li class="gallery-item">
          <a href='${largeImageURL}' class="gallery-link">
            <div >
              <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-img" width="300px"/>
              <div class="gallery-content">
                <p class="gallery-text">
                  <b>Likes:</b> ${likes}
                </p>
                <p class="gallery-text">
                  <b>Views:</b> ${views}
                </p>
                <p class="gallery-text">
                  <b>Comments:</b> ${comments}
                </p>
                <p class="gallery-text">
                  <b>Downloads:</b> ${downloads}
                </p>
              </div>
            </div>
          </a>
        </li>
        `;
      }
    )
    .join('');
}

function scrollToTop() {
  window.scrollTo({
    top: -150,
    behavior: 'smooth',
  });
}
