import View from './View'

class SearchView {
    #searchFields = document.querySelectorAll('.js-search-field');
    #searchFieldsResult = document.querySelector('.search-results-filed');
    #closeSearchButton = document.querySelector('.js-search-close-button');

    #inputSearchObj;
    #inputObjArray = {
        value: ''
    }

    //Catch a input-value from inputObjArray
    getQuery() {
        return this.#inputSearchObj;
    }

    //Closing a search-fields
    closeSearchField() {
        //Close-button for results list
        this.#closeSearchButton.addEventListener('click', () => {
            this.#searchFieldsResult.classList.remove('search-results-filed-active');
            this.#searchFields[0].value =  this.#searchFields[1].value = '';
        });

        //Close Search-Field if click for not on it
        document.addEventListener('click', (elem) => {
            if (!this.#searchFieldsResult.contains(elem.target)) {
                this.#searchFieldsResult.classList.remove('search-results-filed-active');
                window.location.hash = '';
                // if (searchFields[1].value) searchFields[1].value = '';
            }
        });
    }

    //Execute Search-controller & 
    addHandlerSearch(handler) {
        //Helper function for closing a field
        this.closeSearchField();
        
        //Hang up a handler for input-field & Dropdown with results
        this.#searchFields.forEach(elem => {
            elem.addEventListener('input', () => {
                // this.#searchFieldsResult.classList.toggle('search-results-filed-active', elem.value);

                this.#inputObjArray.value = elem.value;
                const {...inputObj} = this.#inputObjArray;
                this.#inputSearchObj = inputObj;
                handler();
            });
        });
    }
}
export default new SearchView();