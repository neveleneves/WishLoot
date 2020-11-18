import View from './View'

class WishlistView {
    #parentElem;
    #childsList;
    #itemforHandling;

    observeSearchList(){
        let target = document.querySelector('.search-result-list');

        const config = {
            attributes: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true
        }; 

        const observer = new MutationObserver(this.checkChanges);
        observer.observe(target, config);
    };

    checkChanges(mutationList) {
        mutationList.forEach(mutation => {
            if(mutation.type === 'childList') {
                //control for childlist
            } else if(mutation.type === 'attributes') {
                //control for child attribute
                console.log(mutation);
                

            }
        });
    }

    addHandlerWishlist(handler) {
        this.observeSearchList();
        handler();
    };
}
export default new WishlistView();