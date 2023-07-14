export function murkupGallery(data) {
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