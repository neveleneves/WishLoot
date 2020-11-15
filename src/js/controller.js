import * as model from './model'
import searchView from './views/searchView'
import searchResultsView from './views/searchResultsView'
import wishlistView from './views/wishlistView'

//Controller for Search section
const controlSearchResults = async () => {
    try {
        //Get a value from input fields
        const query = searchView.getQuery();
        if(!query) return;

        //Load a search results from search-field
        await model.loadSearchResults(query);

        //Rendering search-results
        await searchResultsView.renderSearchResultsView(model.state.search.results);

        //Catch a adding items to wishlist
        wishlistView.itemHandler();
    } catch (error) {
        console.warn(`Something is wrong with the Search-controller:`, error);
    }
};

//Controller for Search section
const controlWishlist = () => {
    try {
        
    } catch (error) {
        console.warn(`Something is wrong with the Wishlist-controller:`, error);
    }
};

//Main function for executing project
const init = () => {
    if (window.location.pathname == '/content.html') {
    searchView.addHandlerSearch(controlSearchResults);
    wishlistView.addHandlerWishlist(controlWishlist);
    } else if (window.location.pathname == '/index.html') {

    }
}
init();