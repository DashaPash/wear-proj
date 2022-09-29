import debounce from 'lodash.debounce';
import markupTpl from '../templates/imageCardTemplate.hbs'
import ApiServise from './apiService.js';
import getRefs from './refs.js';

const refs = getRefs();

const apiServise = new ApiServise();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    clearGalleryMarkup();
    apiServise.query = e.currentTarget.elements.query.value;
    if (apiServise.query === '' || apiServise.query.trim() === '') {
        loadMoreHidden();
        return alert('Enter what you want to find');
    }

    apiServise.resetPage();
    apiServise.fetchGallery()
        .then(appendGalleryMarkup);
    
    loadMoreEnable();
}

function onLoadMore() { 
    apiServise.fetchGallery()
        .then(appendGalleryMarkup);
}

function appendGalleryMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', markupTpl(hits));

    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function clearGalleryMarkup() {
    refs.galleryContainer.innerHTML = '';
}

function loadMoreHidden() {
     refs.loadMoreBtn.classList.add('is-hidden');
}

function loadMoreEnable() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}
