import * as model from './model'
import searchView from './views/searchView'
import searchResultsView from './views/searchResultsView'
import wishlistActionView from './views/wishlistActionView'
import View from './views/View'
import wishlistView from './views/wishlistView'
import donelistView from './views/donelistView'

//Main Controller for Search section
const controlSearchResults = async () => {
    try {
        //Get a value from input fields
        const query = searchView.getQuery();
        if(!query) return;

        //Load a search results from search-field
        await model.loadSearchResults(query);

        //Rendering search-results
        searchResultsView.renderSearchResultsView(model.state.search.results, model.state.wishlist);
    } catch (error) {
        console.warn(`Something is wrong with the Search-controller:`, error);
    }
};

//Controller for Wishlist Action
const controlWishlistAction = async () => {
    try {
        //Catch a item ID and action for that item
        const itemForWishlist = wishlistActionView.getHash();
        if(!itemForWishlist) return;

        //Action for selected item 
        await model.actionWishlist(itemForWishlist);

        //Rendering a item without reloading the page
        wishlistView.renderWishlistView(model.state.wishlist);
    } catch (error) {
        console.warn(`Something is wrong with the Wishlist-controller:`, error);
    }
};

//Main Controller for render Database
const controlDatabase = async () => {
    try {
        //Catch Wishlist from database on server
        await model.loadWishlist();
        //Catch Donelist from database on server
        await model.loadDonelist();

        //Rendering Wishlist section
        wishlistView.renderWishlistView(model.state.wishlist);
        //Rendering Donelist section
        donelistView.renderDonelistView(model.state.donelist);
    } catch (error) {
        console.warn(`Something is wrong with the Wishlist-controller:`, error);
    }
};

//Main function for executing project
const init = () => {
    if (window.location.pathname == '/content.html') {
        View.addHandlerDatabase(controlDatabase);

        searchView.addHandlerSearch(controlSearchResults);
        wishlistActionView.addHandlerWishlistAction(controlWishlistAction);
    } else if (window.location.pathname == '/index.html') {

    }
}
init();