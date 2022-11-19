// import photoCard from './templates/img.hbs';
import API from './js/API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector("form#search-form"),
  searchBtn: document.querySelector("form#search-form button"),
  gallery: document.querySelector("div.gallery"),
  loadMoreBtn :document.querySelector(".load-more"),
};

let page = 1;
let searchQuery = null;

refs.form.addEventListener("submit", onSubmit);
refs.loadMoreBtn.addEventListener("click", onClickloadMoreBtn);

function onSubmit(e) {
  e.preventDefault();
  clearGallery();

  page = 1;
  searchQuery = e.currentTarget.elements.searchQuery.value;

  API.fetchImg(searchQuery, page)
    .then(res => {
      if (res.totalHits) {
        renderPhotoCardMarkup(createPhotoCardMarkup(res.hits));
        showloadMoreBtn();

        if (res.hits.length < 40) {
          whenGalleryEnd();
        }
      }
      else {
        onFetchError();
        clearGallery();
        hideloadMoreBtn();
      }
    })
    .catch(onFetchError)
  
  page += 1;
}

function createPhotoCardMarkup(foundImg) {
  return foundImg
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderPhotoCardMarkup(photoCardMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCardMarkup);
  // refs.gallery.innerHTML = photoCardMarkup;
}

function clearGallery () {
  refs.gallery.innerHTML = "";
}

function onFetchError(error) {
  Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  console.error("Sorry, there are no images matching your search query. Please try again.");
  page = 1;
}

function showloadMoreBtn() {
  refs.loadMoreBtn.classList.remove("hide");
}

function hideloadMoreBtn() {
  refs.loadMoreBtn.classList.add("hide");
}

function onClickloadMoreBtn(e) {
   API.fetchImg(searchQuery, page)
    .then(res => {

      if (res.totalHits) {
        renderPhotoCardMarkup(createPhotoCardMarkup(res.hits));
        if (res.hits.length < 40) {
          whenGalleryEnd();
        }
      }
    })
     .catch(onFetchError)
  
  page += 1;
}

function whenGalleryEnd() {
  Notify.failure("We're sorry, but you've reached the end of search results.");
  hideloadMoreBtn();
}

// ======== фічі ======

// function showNotifix(hits) {
//   Notify.Notify(`Hooray! We found ${totalHits} images.`);
//   console.log(`Hooray! We found ${totalHits} images.`)
// }