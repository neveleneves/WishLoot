import * as model from './model'
import searchView from './views/searchView'
import searchResultsView from './views/searchResultsView'

//Controller for Search func
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
        console.warn('Somthing wrong:', error.massage);
    }
};

//Main Controller funcion for linking Modules & Views
const init = function() {
    //for View a one product
    //addHandlerRender method (load, hash)

    //Views for Search section
    searchView.addHandlerSearch(controlSearchResults);
}
init();