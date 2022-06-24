import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.button-55');

const PIXA_KEY = '28226957-200d43869ee80bd5ab4812e4f';
const URL = `https://pixabay.com/api/?key=${PIXA_KEY}`;
let searchTerm = '';
let page = 1;
let perPage = 40;
``;
function fetchImg(whatToSearch) {
  return axios.get(
    `${URL}&q=${whatToSearch}&image_type=photo&safesearch=false&orientation=horizontal&per_page=${perPage}&page=${page}`
  );
}

function markuping(images) {
  const markUp = images.map(image => createGalleryItem(image)).join('');
  gallery.insertAdjacentHTML('beforeend', markUp);
  lightbox.refresh();
}

function createGalleryItem({
  previewURL,
  likes,
  views,
  comments,
  downloads,
  largeImageURL,
  id,
}) {
  return `<a class="gallery__item" href="${largeImageURL}">
    <div class="photo-card"> 
    <img class="gallery__image" src="${previewURL}" alt="${id}"/>
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
</div>
</a>`;
}

function showBtn(hide) {
  if (hide) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
  }
}

function showNotify(q) {
  console.log(q);
  if (q) {
    Notify.success(`"Hooray! We found ${q} images."`);
  } else {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function scrollBy() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', async e => {
  page = 1;
  e.preventDefault();
  gallery.innerHTML = '';
  searchTerm = e.target[0].value;
  const r = await fetchImg(searchTerm);
  markuping(r?.data?.hits);
  if (r?.data?.totalHits) scrollBy();
  showNotify(r?.data?.totalHits);
  page += 1;
  showBtn(r?.data?.hits?.length >= perPage && r?.data?.totalHits);
});

loadMoreBtn.addEventListener('click', async e => {
  const r = await fetchImg(searchTerm);
  markuping(r?.data?.hits);
  scrollBy();
  page += 1;
});
