import * as model from './model'
import searchView from './views/searchView'
import searchResultsView from './views/searchResultsView'
import wishlistView from './views/wishlistView'
import donelistView from './views/donelistView'
import blogView from './views/blogView'

//Main Controller for Search section
const controlSearchResults = async () => {
    try {
        //Get a value from input fields
        const query = searchView.getQuery();
        if(!query) return;

        //Load a search results from search-field
        await model.loadSearchResults(query);

        //Rendering search-results
        searchResultsView.renderSearchResultsView(model.state.search.results, model.state.wishlist, controlSearchResultsAction);
    } catch (error) {
        console.warn(`Something is wrong with the Search-controller:`, error);
    }
};

//Controller for Wishlist Action
const controlSearchResultsAction = async (itemWishlist) => {
    try {
        if(!itemWishlist) return;

        //Changing the database on the server
        await model.actionSearchResults(itemWishlist);

        //Rendering a item without reloading the page
        await wishlistView.renderView(model.state.wishlist);

        //Handling navigation for an added item from Search Results 
        wishlistView.addHandlerActionSection(controlActionSectionWishlist);
    } catch (error) {
        console.warn(`Something is wrong with the Search-Results-Action-controller:`, error);
    }
};

//Controller for Action in Section Wishlist
const controlActionSectionWishlist = async (itemAction) => {
    try {
        //Changing the database on the server by item action
        await model.actionSections(itemAction);

        //Rendering Donelist section if it has been changed
        if(itemAction.action === 'add') {
            donelistView.renderView(model.state.donelist);
            donelistView.addHandlerActionSection(controlActionSectionDonelist);
        }

        //Rendering Wishlist section if it is empty
        if(model.state.wishlist.length === 0)
        wishlistView.renderView(model.state.wishlist);
    } catch (error) {
        console.warn(`Something is wrong with the Wishlist-Action-Section-controller:`, error);
    }
}

//Controller for Wishlist Section
const controlWishlist = async () => {
    try {
        //Catch Wishlist from database on server
        await model.loadWishlist();

        //Rendering Wishlist section
        await wishlistView.renderView(model.state.wishlist);

        //Handler for wishlist Section action
        wishlistView.addHandlerActionSection(controlActionSectionWishlist);
    } catch (error) {
        console.warn(`Something is wrong with the Wishlist-controller:`, error);
    }
}

//Controller for Action in Section Donelist 
const controlActionSectionDonelist= async (itemAction) => {
    try {
        //Changing the database on the server by item action
        await model.actionSections(itemAction);

        //Rendering Wishlist section if it has been changed
        if(itemAction.action === 'add') {
            wishlistView.renderView(model.state.wishlist);
            wishlistView.addHandlerActionSection(controlActionSectionWishlist);
        }

        //Rendering Donelist section if it is empty
        if(model.state.donelist.length === 0)
        donelistView.renderView(model.state.donelist);
    } catch (error) {
        console.warn(`Something is wrong with the Donelist-Action-Section-controller:`, error);
    }
}

//Controller for Donelist Section
const controlDonelist = async () => {
    try {
        //Catch Donelist from database on server
        await model.loadDonelist();

        //Rendering Donelist section
        await donelistView.renderView(model.state.donelist);

        //Handler for donelist Section action
        donelistView.addHandlerActionSection(controlActionSectionDonelist);
    } catch (error) {
        console.warn(`Something is wrong with the Donelist-controller:`, error);
    }
}


//Controller for Action in Section Blog 
const controlActionSectionBlog = async (blogCard) => {
    try {
        await model.actionSections(blogCard);

        await blogView.renderView(model.state.blog);

    } catch (error) {
        console.warn(`Something is wrong with the Blog-Action-Section-controller:`, error);
    }
}

//Controller for Blog Section
const controlBlog = async () => {
    try {
        await model.loadBloglist();

        await blogView.renderView(model.state.blog);

        blogView.addHandlerActionSection(controlActionSectionBlog);
    } catch (error) {
        console.warn(`Something is wrong with the Blog-controller:`, error);
    }
}

//Main function for executing project
const init = () => {
    if (window.location.pathname == '/content.html') {
        //Contollers for all sections on the website
        searchView.addHandlerSearch(controlSearchResults);
        wishlistView.addHandlerWishlist(controlWishlist);
        donelistView.addHandlerDonelist(controlDonelist);
        blogView.addHandlerBlog(controlBlog);

    } else if (window.location.pathname == '/index.html') {

    }
}
init();