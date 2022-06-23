import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const PIXA_KEY = '28226957-200d43869ee80bd5ab4812e4f';

function markuping(images) {
  const markUp = images
    .map(image => {
      const { previewURL, likes, views, comments, downloads } = image;
      return `<div class="photo-card">
  <img src="${previewURL}" alt="" loading="lazy" />
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
  //   console.log(markUp);
  gallery.insertAdjacentHTML('beforeend', markUp);
}

function fetchImg(whatToSearch) {
  fetch(
    `https://pixabay.com/api/?key=${PIXA_KEY}&q=${whatToSearch}&image_type=photo&safesearch=false&orientation=horizontal&per_page=40`
  )
    .then(r => r.json())
    .then(r => markuping(r.hits));
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  fetchImg(e.target[0].value);
  e.target[0].value = '';
  // console.log(markUp);
});
