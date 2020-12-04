import { data } from "jquery";

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
    }

    buttonCardRemove(handler) {
        this._contentMask = document.querySelector('.content-mask');
        this._itemCards = this._sectionCards.querySelectorAll('.example-product-card');

        this._itemCards.forEach(item => {
            console.log(item);
            const removeButton = item.querySelector('.wrapper-remove-button');

            removeButton.addEventListener('click', () => {
                this._contentMask.classList.add('content-mask-visable');
                this.removeItemPopupHandler(item, handler);
            });
        });
    }

    removeItemPopupHandler(itemForRemove, handler) {
        const popupRemoveItem = document.querySelector('.remove-item-popup');
        const popupButtons = popupRemoveItem.querySelectorAll('button');

        popupButtons.forEach(button => {
            button.addEventListener('click', () => {
                if(button.className === 'success-remove') {
                    itemForRemove.remove();
                    this._itemForAction = itemForRemove;
                    handler();
                }
                this._contentMask.classList.remove('content-mask-visable');
            });
        });
    }

    //Check a changes for Sections
    checkSectionChanges() {
        this._itemCards = this._sectionCards.querySelectorAll('.example-product-card');

        const sectionChanged = {
            sectionName: this._sectionTarget.id,
            itemID: this._itemForAction.id.replace('#', ''),
            action: ''
        };

        if(this._itemCards.length < this._sectionDatabase.length) 
            sectionChanged.action = 'delete';
        else if(this._itemCards.length > this._sectionDatabase.length) 
            sectionChanged.action = 'add';

        return sectionChanged;
    }

    //Main handler for Action in Section
    addHandlerActionSection(handler) {
        this._itemCards = this._sectionCards.querySelectorAll('.example-product-card');

        if (this._itemCards.length) {
            this.buttonCardRemove(handler);
        }
    };

    //Creating a complete list of markup cards for a section
    createSectionMarkup() {
        return this._sectionDatabase.map(this._createMarkupSectionPreview).join('');
    }
}
