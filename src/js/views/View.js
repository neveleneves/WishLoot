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

    //Handler for buttons on cards
    buttonCardHandler(handler) {
        this._contentMask = document.querySelector('.content-mask');
        this._itemCards = this._sectionCards.querySelectorAll('.example-product-card');

        this._itemCards.forEach(item => {
            const removeButton = item.querySelector('.wrapper-remove-button');
            const addButton = item.querySelector('.wrapper-done-button');

            let sectionAction = {
                sectionName: this._sectionTarget.id,
                id: item.id.replace('#', ''),
                action: ''
            };

            removeButton.addEventListener('click', () => {
                this._contentMask.classList.add('content-mask-visable');
                this._contentMask.querySelector('.remove-item-popup').classList.add('remove-item-popup-visable');

                sectionAction.action = 'delete';
                this.removeItemPopupHandler(item, handler, sectionAction);
            });

            addButton.addEventListener('click', () => {
                sectionAction.action = 'add';
                this.addButtonHandler(item, handler, sectionAction);
            });
        });
    }

    //Functional for click add-button
    addButtonHandler(itemForAdd, handler, sectionAction) {
        itemForAdd.remove();

        this._itemForAction = itemForAdd;
        handler(sectionAction);
    }

    //Popup functional for click remove-button
    removeItemPopupHandler(itemForRemove, handler, sectionAction) {
        const popupRemoveItem = document.querySelector('.remove-item-popup');
        const popupButtons = popupRemoveItem.querySelectorAll('button');

        popupButtons.forEach(button => {
            button.addEventListener('click', () => {
                if(button.className === 'success-remove') {
                    itemForRemove.remove();
                    this._itemForAction = itemForRemove;
                    handler(sectionAction);
                }
                this._contentMask.classList.remove('content-mask-visable');
                this._contentMask.querySelector('.remove-item-popup').classList.remove('remove-item-popup-visable');
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

        if (this._itemCards.length) 
            this.buttonCardHandler(handler);
    };

    //Creating a complete list of markup cards for a section
    createSectionMarkup() {
        return this._sectionDatabase.map(this._createMarkupSectionPreview).join('');
    }
}
