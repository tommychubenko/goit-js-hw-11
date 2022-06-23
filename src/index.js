import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.button-55');

const PIXA_KEY = '28226957-200d43869ee80bd5ab4812e4f';
let searchTerm = '';
let page = 1;

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

function fetchImg(whatToSearch) {
  return fetch(
    `https://pixabay.com/api/?key=${PIXA_KEY}&q=${whatToSearch}&image_type=photo&safesearch=false&orientation=horizontal&per_page=40&page=${page}`
  ).then(r => r.json());
}

function markuping(images) {
  const markUp = images
    .map(image => {
      const {
        previewURL,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
        id,
      } = image;

      return `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image" src="${previewURL}" alt="${id}"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b></br>${likes}
    </p>
    <p class="info-item">
      <b>Views:</b></br>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b></br>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b></br>
      ${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markUp);
}

function showBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

searchForm.addEventListener('submit', e => {
  page = 1;
  e.preventDefault();
  gallery.innerHTML = '';
  searchTerm = e.target[0].value;
  fetchImg(e.target[0].value)
    .then(r => markuping(r.hits))
    .then(showBtn());

  console.dir(fetchImg(e.target[0].value));
  page += 1;
  //   console.log(page);
  e.target[0].value = '';
});

loadMoreBtn.addEventListener('click', e => {
  fetchImg(searchTerm).then(r => markuping(r.hits));
  page += 1;
  //   console.log(page);
});
