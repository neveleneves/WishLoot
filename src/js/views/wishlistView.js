import View from './View'

class WishlistView {
    #wishlistSection = document.querySelector('.wishlist-section');
    #wishlistCardsSection = this.#wishlistSection.querySelector('.wrapper-product-cards');

    #wishlistTitle;
    #wishlistDatabase;

    //Main method for render Wishlist section
    renderWishlistView(wishlistData) {
        if(!wishlistData || (Array.isArray(wishlistData) && wishlistData.length === 0)) return this.wishlistEmptyMarkup();

        this.#wishlistTitle = this.#wishlistSection.querySelector('.info-title');
        this.#wishlistDatabase = wishlistData;

        [this.#wishlistCardsSection, this.#wishlistTitle].forEach((elem) => {
            if(elem) elem.innerHTML = '';
        });

        const markupWishlistCards = this.createMarkupWishlist();
        this.#wishlistCardsSection.insertAdjacentHTML('afterbegin', markupWishlistCards);

        this.buttonProductHandler();
    }

    buttonProductHandler() {
        console.log(document.querySelectorAll('.example-product-card'));
    }

    createMarkupWishlist() {
        return this.#wishlistDatabase.map(this.createMarkupPreviewWishlist).join('');
    }

    //Create markup for each card product
    createMarkupPreviewWishlist(wishlistDataCard) {
        return `
            <div class="example-product-card" id="#${wishlistDataCard.id}">
                <div class="product-image">
                    <a href="https://stockx.com/${wishlistDataCard.id}" class="product-link">
                        <img src="${wishlistDataCard.image_url}" alt="${wishlistDataCard.name}" class="">
                    </a>
                </div>
                <h3 class="product-title">${wishlistDataCard.name}</h3>
                <div class="product-panel">
                    <a href="/" class="remove-button product-button">
                        <svg class="product-svg" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.58853 6.98715L15.9206 15.4511M7.58853 15.4511L15.9206 6.98715M11.7546 21.0938C6.38594 21.0938 2.03381 16.6728 2.03381 11.2191C2.03381 5.76552 6.38594 1.34448 11.7546 1.34448C17.1232 1.34448 21.4753 5.76552 21.4753 11.2191C21.4753 16.6728 17.1232 21.0938 11.7546 21.0938Z" stroke="#a0a0a0" stroke-width="2.5"/>
                        </svg>
                    </a>
                    <h3 class="product-price">${wishlistDataCard.last_sale_price}$</h3>
                    <a href="/" class="done-button product-button">
                        <svg class="product-svg" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.52441 11.3445L10.8101 14.9159L16.5244 7.77305M11.5244 21.3445C6.00157 21.3445 1.52441 16.8673 1.52441 11.3445C1.52441 5.82163 6.00157 1.34448 11.5244 1.34448C17.0473 1.34448 21.5244 5.82163 21.5244 11.3445C21.5244 16.8673 17.0473 21.3445 11.5244 21.3445Z" stroke="#a0a0a0" stroke-width="2.5"/>
                        </svg> 
                    </a>
                </div>
            </div>
        `;
    }

    //Wishlist Section failed message
    wishlistEmptyMarkup() {
        const emptyListMarkup = `
            <h2 class="info-title">Wish-list is still empty</h2>
        `;
        this.#wishlistCardsSection.innerHTML = '';
        this.#wishlistCardsSection.insertAdjacentHTML('afterend', emptyListMarkup);
    }
}
export default new WishlistView();