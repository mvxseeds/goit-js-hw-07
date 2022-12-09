import { galleryItems } from './gallery-items.js';

const galleryContainerEl = document.querySelector('.gallery');

const galleryItemsMarkup = createGalleryItemMarkup(galleryItems);
populateGallery(galleryItemsMarkup);

const gallery = new SimpleLightbox('.gallery a', { 
  captionDelay: 250,
  captionsData: "alt",
});


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
}