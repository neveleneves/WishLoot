import View from './View'

class WishlistView {
    #wishlistSection = document.querySelector('.wishlist-section');

    //Main method for render Wishlist section
    renderWishlistView(wishlistData) {
        if(!wishlistData || (Array.isArray(wishlistData) && wishlistData.length === 0)) return this.wishlistEmptyMarkup();
    }

    //Wishlist Section failed message
    wishlistEmptyMarkup() {
        const wishlistProductsSection = this.#wishlistSection.querySelector('.wrapper-product-cards');

        const emptyListMarkup = `
            <h2 class="info-title">Wishlist is still empty</h2>
        `;
        wishlistProductsSection.innerHTML = '';
        wishlistProductsSection.insertAdjacentHTML('afterend', emptyListMarkup);
    }

    addHandlerWishlist(handler) {
        window.addEventListener("load", () => {
            handler();
        });
    };
}
export default new WishlistView();