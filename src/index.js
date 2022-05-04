import './sass/main.scss';
import { gallery } from './js/lightBoxGallery';
import { FetchDataPhotos } from './js/fetchPhotos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const findPhotos = new FetchDataPhotos();

const refs = {
  queryInput: document.querySelector('.search-input'),
  searchForm: document.querySelector('.search-form'),
  photoBlock: document.querySelector('.photo-card'),
};

console.dir(refs.searchForm);

refs.searchForm.addEventListener('submit', onClickFindPhotos);

function onClickFindPhotos(event) {
  event.preventDefault();
  // Проверка на пустую строку
  if (!event.target.elements['search-box'].value) {
    Notify.failure('Write what you want to find please');
    return;
  }
  findPhotos
    .fetchPhotos(event.target.elements['search-box'].value)
    .then(photos => createPhotosMarkup(photos))
    .catch(error => {
      Notify.failure('ERROR', error);
    });
}

function createPhotosMarkup(photos) {
  if (photos.hits.length === 0) {
    refs.photoBlock.innerHTML = '';
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else {
    console.log(photos.hits[0]);
    const markup = photos.hits.map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
			    <a class="gallery__link" href="${largeImageURL}">
			<img src='${webformatURL}' alt="${tags}" loading="lazy" class="gallery__image"/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
	</a>`,
    );
    refs.photoBlock.innerHTML = markup.join('');
  }
  gallery.refresh();
}

// 5. Переписать функции на async / await

// 3. Добавить пагинацию по кнопке и добавить кнопку пагинации.

// 4. Сделать задачи из пункта Дополнительно
