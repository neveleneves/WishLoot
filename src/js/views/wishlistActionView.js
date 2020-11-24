import View from './View'

class WishlistActionView {

    #hashForHandling;
    
    //Getting a item id and action
    getHash() {
        let item = {
            id: this.#hashForHandling,
            action: ''
        };

        if (item.id.includes('add')){
            item.action = true;
            item.id = item.id.replace('#item-add-', '');
        } else if (this.#hashForHandling.includes('delete')) {
            item.action = false;
            item.id = item.id.replace('#item-delete-', '');
        }
        return item;
    }

    //Main handler for Wishlist action
    addHandlerWishlistAction(handler) {
        window.addEventListener('hashchange', ()=>{
            const hash = window.location.hash;

            if(hash.includes('item-')) {
                this.#hashForHandling = window.location.hash;
                handler();
            } 
        });
    };
}
export default new WishlistActionView();