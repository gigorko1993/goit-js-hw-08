import markupElementsArray from '../gallery-items.js';

const listElements = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const overlayImageEl = document.querySelector('.lightbox__image');
const listMarkup = makeMarkup(markupElementsArray);

listElements.addEventListener('click', onImageClick)
lightbox.addEventListener('click', onCloseModal)

listElements.insertAdjacentHTML('beforeend', listMarkup);

function makeMarkup(array) {
    const markup = array.map(({ original, preview, description }) => {
        return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li> 
  `}).join('')
    return markup;
};
 
function getArrayOfImageURL(arr) {
    const arrayOfImgUrl = arr.map(a => a.original);
    return arrayOfImgUrl;
};
 
function onImageClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    };

    evt.preventDefault();
    window.addEventListener('keydown', onEscButtonPress)
    window.addEventListener('keydown', onArrowButtonPress)
    lightbox.classList.add('is-open');
    overlayImageEl.src = evt.target.dataset.source;
};
 
function onCloseModal(evt) {
    if (evt.target.dataset.action === "close-lightbox" || evt.target.classList.value === "lightbox__overlay" || evt.code === 'Escape') {
        lightbox.classList.remove('is-open');
        overlayImageEl.src = "";
        window.removeEventListener('keydown', onEscButtonPress)
        window.removeEventListener('keydown', onArrowButtonPress)
    }
}

function onEscButtonPress(evt) {
    if (evt.code === 'Escape') {
        lightbox.classList.remove('is-open');
        overlayImageEl.src = "";
        window.removeEventListener('keydown', onEscButtonPress)
        window.removeEventListener('keydown', onArrowButtonPress)
    }
}
function onArrowButtonPress(evt) {
    const arrayOfUrl = getArrayOfImageURL(markupElementsArray);
    let indexInArray = arrayOfUrl.indexOf(overlayImageEl.src);
    
    if (evt.code === 'ArrowLeft' && indexInArray === 0) {
        overlayImageEl.src = arrayOfUrl[arrayOfUrl.length - 1];
    }
    else if (evt.code === 'ArrowRight' && indexInArray === arrayOfUrl.length - 1) {
        overlayImageEl.src = arrayOfUrl[0];
    }
    else if (evt.code === 'ArrowRight' || evt.code === 'ArrowLeft') {

        evt.code === 'ArrowLeft'
            ? overlayImageEl.src = arrayOfUrl[indexInArray - 1]
            : overlayImageEl.src = arrayOfUrl[indexInArray + 1];
    }
    }
