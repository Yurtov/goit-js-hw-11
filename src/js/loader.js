export function showLoader(refs) {
  refs.preloader.style.display = 'block';
}

export function hideLoader(refs) {
  window.setTimeout(function () {
    refs.preloader.style.display = 'none';
  }, 1500);
}
