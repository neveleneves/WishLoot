import View from './View'

class WishlistView {

    #hashForHandling;
    // observeSearchList(){
    //     let target = document.querySelector('.search-result-list');

    //     const config = {
    //         attributes: true,
    //         attributeFilter: ['class'],
    //         childList: true,
    //         subtree: true
    //     }; 

    //     const observer = new MutationObserver(this.checkChanges);
    //     observer.observe(target, config);

    // };

    // checkChanges(mutationList) {
    //     const searchList = document.querySelector('.search-result-list');
        
    //     mutationList.forEach(mutation => {
    //         if(mutation.type === 'childList') {
    //             //control for childlist
    //         } else if(mutation.type === 'attributes') {
    //             //control for child attribute
    //             if(mutation.target.classList.contains('added')) {
    //                 let itemsForHandling = searchList.querySelectorAll('.added');
    //             }
    //             else {

    //             }
    //         }
    //     });
    // }
    getHash() {
        let item = {
            hash: this.#hashForHandling,
            action: ''
        };

        if (item.hash.includes('add')){
            item.action = true;
            item.hash = item.hash.replace('item-add-', '');
        } else if (this.#hashForHandling.includes('delete')) {
            item.action = false;
            item.hash = item.hash.replace('item-delete-', '');
        }
        return item;
    }

    addHandlerWishlist(handler) {
        window.addEventListener('hashchange', ()=>{
            const hash = window.location.hash;

            if(hash.includes('item-')) {
                this.#hashForHandling = window.location.hash;
                handler();
            } 
        });
    };
}
export default new WishlistView();