import * as model from './model'
import searchView from './views/searchView'
import searchResultsView from './views/searchResultsView'

//Controller for Search section
async function controlSearchResults() {
    try {
        //Get a value from input fields
        const query = searchView.getQuery();
        if(!query) return;

        //Load a search results from search-field
        await model.loadSearchResults(query);

        //Rendering search-results
        searchResultsView.renderSearchResultsView(model.state.search.results);
        
    } catch (error) {
        console.warn(`Something is wrong with the controller:`, error);
    }
};

//Main function for executing project
const init = function() {
    if (window.location.pathname == '/content.html') {
    //for View a one product
    //addHandlerRender method (load, hash)

    //Views for Search section
    searchView.addHandlerSearch(controlSearchResults);
    } else if (window.location.pathname == '/index.html') {

    }
}
init();