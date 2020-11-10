class SearchView {
    #parentElem = document.querySelectorAll('.js-search-form');

    getQuery() {
        return this.#parentElem.querySelectorAll('.js-search-field').value;
    }

    addHandlerSearch(handler) {
        this.#parentElem.addEventListener('input', ()=>{

        });
    }
}
export default new SearchView();