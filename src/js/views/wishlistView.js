import View from './View'

class WishlistView {
    #parentElem;
    #childsList;

    itemHandler() {
        this.#parentElem = document.querySelector('.search-result-list');
        this.#childsList = this.#parentElem.querySelectorAll('li');

        this.#childsList.forEach(elem => {
            const addItemButton = elem.querySelector('.wrapper-search-item-nav');

            addItemButton.addEventListener('click', () => {
                if (addItemButton.querySelector('.add-done-visable')) {
                    console.log(elem.id);
                }
                else {
                    
                }
            });
        });
    };
    
    addHandlerWishlist(handler) {
        handler();
    };
}
export default new WishlistView();