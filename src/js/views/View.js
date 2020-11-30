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

        //Returning modified data
    }

    buttonCardRemove() {
        this._contentMask = document.querySelector('.content-mask');
        const itemCards = this._sectionCards.querySelectorAll('.example-product-card');

        itemCards.forEach(item => {
            const removeButton = item.querySelector('.wrapper-remove-button');

            removeButton.addEventListener('click', () => {
                this._contentMask.classList.add('content-mask-visable');
                this.removeItemPopupHandler(item);
            });

            //Search itemCard in section data + delete this item
            //+ function for render call again
        });
    }

    removeItemPopupHandler(itemForRemove) {
        const popupRemoveItem = document.querySelector('.remove-item-popup');
        const popupButtons = popupRemoveItem.querySelectorAll('button');

        popupButtons.forEach(button => {
            button.addEventListener('click', () => {
                if(button.className === 'success-remove') {
                    itemForRemove.remove();
                    // + edit section data right now

                    //
                }
                this._contentMask.classList.remove('content-mask-visable');
            });
        });
    }

    //Creating a complete list of markup cards for a section
    createSectionMarkup() {
        return this._sectionDatabase.map(this._createMarkupSectionPreview).join('');
    }
}
