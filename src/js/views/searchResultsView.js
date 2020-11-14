
import View from './View';

class SearchResultsView{
    #parentElem = document.querySelector('.search-result-list');
    #searchFieldsResult = document.querySelector('.search-results-filed');
    #searchFields = document.querySelectorAll('.js-search-field');

    #itemNavButton;
    #data;

    //Main method for render Search Results Field
    renderSearchResultsView(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.itemsNotFoundMarkup();

        this.#data = data;
        this.#parentElem.innerHTML = '';
        // this.preloaderImages();
        const markupSearchResults = this.createMarkup();
        this.#parentElem.insertAdjacentHTML('afterbegin', markupSearchResults);

        this.itemSearchNavController();

        this.#searchFields.forEach(elem => {
            if(elem.value) 
                this.#searchFieldsResult.classList.toggle('search-results-filed-active', elem.value);
        });
    }

    // preloaderImages() {
    //     this.#data.map(this.perloaderOneImage);
    // }

    // perloaderOneImage(item) {
    //     const img = new Image();
    //     img.src =  item.image_url;
    // }

    //Add/Remove a new search-item in wishlist
    itemSearchNavController() {
        this.#itemNavButton = document.querySelectorAll('.wrapper-search-item-nav');
        console.log(this.#itemNavButton);

        this.#itemNavButton.forEach(elem => {
            elem.addEventListener('click', () => {
                const links = elem.querySelectorAll('a');

                links[0].classList.toggle('add-search-visable-none');
                links[1].classList.toggle('add-done-visable');
            });
        });
    };

    //Search failed message
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

    //Merging the markup of all cards
    createMarkup() {
        return this.#data.map(this.createMarkupPreview).join('');
    }

    //Markup of the card for the item found in the search
    createMarkupPreview(itemResult) {
        return `
            <li class="search-list-item">
                <div class="example-search-card-result">
                    <img onerror="this.onerror=null; this.src='/assets/img/item-unknow.jpg';" src="${itemResult.image_url}" alt="${itemResult.name}" class="example-search-card-img">
                    <div class="example-search-card-info">
                        <h2 class="example-search-card-title">${itemResult.name}</h2>
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
    }
}
export default new SearchResultsView();