import { refs } from './refs';
export function scrollShowBtnToTop(){
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    scrollY > 400 ? refs.scrollToTopBtnEl.classList.remove('btn-up_hide') : refs.scrollToTopBtnEl.classList.add('btn-up_hide');
  });
}

export function scrollToTop() {
  window.scrollTo({
    top: -150,
    behavior: 'smooth',
  });
}