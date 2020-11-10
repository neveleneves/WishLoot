import * as model from './model'
import searchView from './views/searchView'

//Handling the input event and catching data 
const catchSearchResult = () => {
    const inputSearchItems = document.querySelectorAll('.js-search-field');
    let inputObjArray = { 
        value: ''
    }
    
    inputSearchItems.forEach(elem => {
        elem.addEventListener('input', () => {
            //Obj by input fields
            inputObjArray.value = elem.value;
            const {...inputObj} = inputObjArray;

            //Transfer input value from search fields (obj)
            controlSearchResults(inputObj);
        });
    });
};

//Main contoller
async function controlSearchResults(inputObj) {
    try {
        const query = searchView.getQuery();
        if(!query) return;

        //Load a search results from search-field
        await model.loadSearchResults(query);
        console.log(model.state.search.results);

        //Rendering search-results   
        //

    } catch (error) {
        console.warn('Somthing wrong:', error.massage);
    }
};

//
const init = function() {
    //for View addHandlerRender method (load, hash)
    searchView.addHandlerSearch(controlSearchResults);
}
init();
catchSearchResult();