import * as model from './model'
import searchView from './views/searchView'
import searchResultsView from './views/searchResultsView'
import wishlistActionView from './views/wishlistActionView'
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
        // wishlistView.renderView(model.state.wishlist);

    } catch (error) {
        console.warn(`Something is wrong with the Wishlist-Action-controller:`, error);
    }
};

//Controller for Action in Section Wishlist
const controlActionSectionWishlist= async () => {
    try {
        //Catch a changes from Wishlist
        const sectionChanged = wishlistView.checkSectionChanges();

        //Changing the database on the server
        await model.actionSections(sectionChanged);

        //Rendering Wishlist section if wishlist is empty
        if(model.state.wishlist.length === 0)
        wishlistView.renderView(model.state.wishlist);
    } catch (error) {
        console.warn(`Something is wrong with the Action-Section-controller:`, error);
    }
}

//Controller for Wishlist Section
const controlWishlist = async () => {
    try {
        //Catch Wishlist from database on server
        await model.loadWishlist();

        //Rendering Wishlist section
        await wishlistView.renderView(model.state.wishlist);

        wishlistView.addHandlerActionSection(controlActionSectionWishlist);
    } catch (error) {
        console.warn(`Something is wrong with the Wishlist-controller:`, error);
    }
}

//Controller for Action in Section Wishlist/Donelist 
const controlActionSectionDonelist= async () => {
    try {
        //Catch a changes from Donelist
        const sectionChanged = donelistView.checkSectionChanges();

        //Changing the database on the server
        await model.actionSections(sectionChanged);

        //Rendering Donelist section if donelist is empty
        if(model.state.donelist.length === 0)
        donelistView.renderView(model.state.donelist);
    } catch (error) {
        console.warn(`Something is wrong with the Action-Section-controller:`, error);
    }
}

//Controller for Donelist Section
const controlDonelist = async () => {
    try {
        //Catch Donelist from database on server
        await model.loadDonelist();

        //Rendering Donelist section
        await donelistView.renderView(model.state.donelist);

        donelistView.addHandlerActionSection(controlActionSectionDonelist);
    } catch (error) {
        console.warn(`Something is wrong with the Donelist-controller:`, error);
    }
}

//Main function for executing project
const init = () => {
    if (window.location.pathname == '/content.html') {
        //Contollers for all sections on the website
        searchView.addHandlerSearch(controlSearchResults);
        wishlistActionView.addHandlerWishlistAction(controlWishlistAction);
        wishlistView.addHandlerWishlist(controlWishlist);
        donelistView.addHandlerDonelist(controlDonelist);

    } else if (window.location.pathname == '/index.html') {

    }
}
init();