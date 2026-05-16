import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
    getImagesByQuery
} from './js/pixabay-api';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let totalPages = 0;
form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
    event.preventDefault();

    searchQuery = event.target.elements['search-text'].value.trim();

    if (!searchQuery) {
        iziToast.warning({
            message: 'Please enter search text',
            position: 'topRight',
        });
        return;
    }

    page = 1;

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(searchQuery, page);
    
        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query.Please try again!',
                position: 'topRight',
            });
            return;
        }

        createGallery(data.hits);
        
        totalPages = Math.ceil(data.totalHits / perPage);

        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        } else if (page < totalPages){
            showLoadMoreButton();
        
        }
        iziToast.success({
            message: `Hooray! We found ${data.totalHits} images.`,
            position: 'topRight',
        })
    }
    catch (error) {
        iziToast.error({
            message: 'Something went wrong.Please try again later.',
            position: 'topRight',
        });
    }
    finally {
        hideLoader();
    }
}

async function onLoadMore() {
    page += 1;

    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(searchQuery, page);
        createGallery(data.hits);
        scrollPage();

        if (page >= totalPages) {
            hideLoadMoreButton();

            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
            return;
        }

        showLoadMoreButton();
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong.Please try again later.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
}

function scrollPage() {
    const galleryItem = document.querySelector('.gallery-item');

    if (!galleryItem) {
        return;
    }

    const cardHeight = galleryItem.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}