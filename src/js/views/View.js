export default class View {
    //Main method for render Wishlist section
    renderView(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this._sectionEmptyMarkup();

        this._titleMain = this._sectionTarget.querySelector('.info-title');
        this._sectionDatabase = data;

        [this._sectionCards, this._titleMain].forEach((elem) => {
            if(elem) elem.innerHTML = '';
        });

        const markupSectionCards = this.createSectionMarkup();
        this._sectionCards.insertAdjacentHTML('afterbegin', markupSectionCards);

        this.buttonCardRemove();
    }

    buttonCardRemove() {
        const removeButtons = this._sectionCards.querySelectorAll('.wrapper-remove-button');
        const contentMask = document.querySelector('.content-mask');

        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                contentMask.classList.add('content-mask-visable');
            });
        });
    }

    //Creating a complete list of markup cards for a section
    createSectionMarkup() {
        return this._sectionDatabase.map(this._createMarkupSectionPreview).join('');
    }
}
