import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const LoadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(image => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
            <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"/> 
            </a>

            <ul class="info">
            <li class="info-item"><b>Likes</b><span>${image.likes}</span></li>
            <li class="info-item"><b>Views</b><span>${image.views}</span></li>
            <li class="info-item"><b>Comments</b><span>${image.comments}</span></li>
            <li class="info-item"><b>Downloads</b><span>${image.downloads}</span></li>
            </ul>
        </li>`)
        .join('');
    
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

export function showLoader() {
    loader.classList.remove('is-hidden');
}

export function hideLoader() {
    loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
    LoadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
    LoadMoreBtn.classList.add('is-hidden');
}