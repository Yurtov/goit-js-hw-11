export function showLoader(refs) {
  refs.loadingMessage.style.display = 'block';
}

export function hideLoader(refs) {
  window.setTimeout(function () {
    refs.loadingMessage.style.display = 'none';
  }, 1000);
}
