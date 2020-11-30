import View from './View';

class SearchResultsView{
    #parentElem = document.querySelector('.search-result-list');
    #searchFieldsResult = document.querySelector('.search-results-filed');
    #searchFields = document.querySelectorAll('.js-search-field');
    
    #searchListItems;
    #data;
    #wishlistData;

    //Main method for render Search Results Field
    renderSearchResultsView(data, wishlistData) {
        if(wishlistData) this.#wishlistData = wishlistData;

        if(!data || (Array.isArray(data) && data.length === 0)) return this.itemsNotFoundMarkup();

        this.#data = data;
        this.#parentElem.innerHTML = '';
        const markupSearchResults = this.createMarkup();
        this.#parentElem.insertAdjacentHTML('afterbegin', markupSearchResults);
        
        this.#searchFields.forEach(elem => {
            if(elem.value) 
                this.#searchFieldsResult.classList.toggle('search-results-filed-active', elem.value);
        });

        this.itemSearchNav();

        if(this.#wishlistData) 
            this.checkWishlistBase();
    }
    
    //Check wishlist for added items
    checkWishlistBase() {
        this.#data.forEach(dataElem => {
            this.#wishlistData.forEach(wishlistElem => {
                if(dataElem.id === wishlistElem.id) {
                    const listProduct = this.#parentElem.querySelector(`#${wishlistElem.id}`);
                    const itemButton = listProduct.querySelector('.wrapper-search-item-nav');
                    const links = itemButton.querySelectorAll('a');

                    listProduct.classList.add("added");
                    links[0].classList.add('add-search-visable-none');
                    links[1].classList.add('add-done-visable');
                }
            });
        });
    };

    //Add/Remove a new search-item in wishlist
    itemSearchNav() {
        this.#searchListItems = this.#parentElem.querySelectorAll('.search-list-item');

        this.#searchListItems.forEach(item => {
            const itemButton = item.querySelector('.wrapper-search-item-nav');

            itemButton.addEventListener('click', () => {

                const links = itemButton.querySelectorAll('a');

                links[0].classList.toggle('add-search-visable-none');
                links[1].classList.toggle('add-done-visable');

                if (itemButton.querySelector('.add-done-visable')) {
                    item.classList.add('added');
                    window.location.hash = 'item-add-'+item.id;
                }
                else {
                    item.classList.remove('added');
                    window.location.hash = 'item-delete-'+item.id;
                }
                window.location.reload();
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
            <li class="search-list-item" id="${itemResult.id}">
                <div class="example-search-card-result">
                    <img onerror="this.onerror=null; this.src='/assets/img/item-unknow.jpg';" src="${itemResult.image_url_small}" alt="${itemResult.name}" class="example-search-card-img">
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