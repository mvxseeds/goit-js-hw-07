import { galleryItems } from './gallery-items.js';

const galleryContainerEl = document.querySelector('.gallery');

const galleryItemsMarkup = createGalleryItemMarkup(galleryItems);
populateGallery(galleryItemsMarkup);

galleryContainerEl.addEventListener('click', onGalleryImageClick);


const instance = basicLightbox.create(`
    <div class="modal">
        <img src="https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg" width="1280" height="855">
    </div>
`)


function createGalleryItemMarkup(galleryItems) {
    return galleryItems.map(item => 
       `<a class="gallery__item" href="${item.original}">
            <img 
                class="gallery__image" 
                src="${item.preview}" 
                alt="${item.description}" 
            />
        </a>`
    ).join('');
}


function populateGallery(markup) {
    galleryContainerEl.innerHTML = markup;
    // galleryContainerEl.insertAdjacentHTML('beforeend', markup);
}


function onGalleryImageClick(e) {
    e.preventDefault();

    const isGalleryImage = e.target.classList.contains('gallery__image');

    if (!isGalleryImage) {
        return;
    }

    openModal(e.target.dataset.source);
}


function openModal(source) {
  // create modal window instance
  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${source}" width="1280" height="855">
    </div>
  `
  , {
    // add listener to window before modal opened
    onShow: (instance) => {
      window.addEventListener('keydown', onEscKeyPress);
    },
    // remove listener before modal opened
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscKeyPress);
    }
  });
  
  instance.show();
  
  function onEscKeyPress(e) {
    const ESC_KEY_CODE = 'Escape';

    if (e.code === ESC_KEY_CODE) {
        instance.close();
    }
  }
}