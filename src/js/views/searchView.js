import View from './View'

class SearchView {
    #parentElem = document.querySelectorAll('.js-search-field');
    #inputSearchObj;
    #inputObjArray = {
        value: ''
    }

    //Catch a input-value from inputObjArray
    getQuery() {
        return this.#inputSearchObj;
    }

    //Hang up a handler for input-field & Execute Search-controller
    addHandlerSearch(handler) {
        this.#parentElem.forEach(elem => {
            elem.addEventListener('input', () => {
                this.#inputObjArray.value = elem.value;
                const {...inputObj} = this.#inputObjArray;
                this.#inputSearchObj = inputObj;
                handler();
            });
        });
    }
}
export default new SearchView();