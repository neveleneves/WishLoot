
import View from './View';

class SearchResultsView{
    #parentElem = document.querySelector('.search-result-list');
    #data;

    renderSearchResultsView(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.itemsNotFoundMarkup();

        this.#data = data;
        this.#parentElem.innerHTML = '';
        const markupSearchResults = this.createMarkup();
        this.#parentElem.insertAdjacentHTML('afterbegin', markupSearchResults);
    }

    itemsNotFoundMarkup() {
        const notFoundMarkup = `
            <li class="search-list-item-no-results">
                <div class="search-no-results">
                    <h2 class="search-no-results-title">No results found</h2>
                </div>
            </li>
        `;
        this.#parentElem.innerHTML = '';
        this.#parentElem.insertAdjacentHTML('afterbegin', notFoundMarkup);
    }

    createMarkup() {
        return this.#data.map(this.createMarkupPreview).join('');
    }

    createMarkupPreview(itemResult) {
        // var img = new Image();
        // img.onload = function() {
        //     console.log('Success'); 
        // };
        // img.onerror = function(itemResult) {
        //     itemResult.image_url = '/assets/img/item-unkown.jpg';
        //     console.log(itemResult.image_url);
        // };
        // img.src = itemResult.image_url;
        // console.log(itemResult.image_url + " Main img");

        return `
            <li class="search-list-item">
                <div class="example-search-card-result">
                    <img onerror="this.onerror=null; this.src='/assets/img/item-unknow.jpg';" src="${itemResult.image_url}" alt="${itemResult.name}" class="example-search-card-img">
                    <div class="example-search-card-info">
                        <h2 class="example-search-card-title">${itemResult.name}</h2>
                        <h3 class="example-search-card-brand">${itemResult.brand}</h3>
                    </div>
                </div>
                <div class="wrapper-search-item-nav">
                    <a class="add-search-card">
                        <svg class="add-search-button" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6667 6.66669V16.6667M6.66675 11.6667H16.6667M11.6667 21.6667C6.1439 21.6667 1.66675 17.1895 1.66675 11.6667C1.66675 6.14384 6.1439 1.66669 11.6667 1.66669C17.1896 1.66669 21.6667 6.14384 21.6667 11.6667C21.6667 17.1895 17.1896 21.6667 11.6667 21.6667Z" stroke="#828282" stroke-width="2"/>
                        </svg>
                    </a>
                    <a class="add-done-search-card">
                        <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.53345 13.7333L8.43345 20.6333L21.4668 4.59998" stroke="#06924c" stroke-width="3" stroke-linecap="square"/>
                        </svg>
                    </a>
                </div>
            </li>
        `;
        // searchResults.innerHTML = '';
        // searchList.insertAdjacentHTML('afterbegin', markup);
    }
}
export default new SearchResultsView();