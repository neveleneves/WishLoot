import View from './View'

class DonelistView {
    #donelistSection = document.querySelector('.done-section');
    #donelistCardsSection = this.#donelistSection.querySelector('.wrapper-product-cards');

    #donelistTitle;
    #donelistDatabase;

    //Main method for render Donelist section
    renderDonelistView(donelistData) {
        if(!donelistData || (Array.isArray(donelistData) && donelistData.length === 0)) return this.donelistEmptyMarkup();

        this.#donelistTitle = this.#donelistSection.querySelector('.info-title');
        this.#donelistDatabase = donelistData;

        [this.#donelistCardsSection, this.#donelistTitle].forEach((elem) => {
            if(elem) elem.innerHTML = '';
        });

        const markupDonelistCards = this.createMarkupDonelist();
        this.#donelistCardsSection.insertAdjacentHTML('afterbegin', markupDonelistCards);
    }

    createMarkupDonelist() {
        return this.#donelistDatabase.map(this.createMarkupPreviewDonelist).join('');
    }

    //Create markup for each card product
    createMarkupPreviewDonelist(donelistDataCard) {
        return `
            <div class="example-product-card" id="#${donelistDataCard.id}">
                <div class="product-image">
                    <a href="https://stockx.com/${donelistDataCard.id}" class="product-link">
                        <img src="${donelistDataCard.image_url}" alt="${donelistDataCard.name}" class="">
                    </a>
                </div>
                <h3 class="product-title">${donelistDataCard.name}</h3>
                <div class="product-panel">
                    <a href="/" class="remove-button product-button">
                        <svg class="product-svg" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.58853 6.98715L15.9206 15.4511M7.58853 15.4511L15.9206 6.98715M11.7546 21.0938C6.38594 21.0938 2.03381 16.6728 2.03381 11.2191C2.03381 5.76552 6.38594 1.34448 11.7546 1.34448C17.1232 1.34448 21.4753 5.76552 21.4753 11.2191C21.4753 16.6728 17.1232 21.0938 11.7546 21.0938Z" stroke="#a0a0a0" stroke-width="2.5"/>
                        </svg>
                    </a>
                    <h3 class="product-price">${donelistDataCard.last_sale_price}$</h3>
                    <a href="/" class="done-button product-button">
                        <svg class="product-svg" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.52441 11.3445L10.8101 14.9159L16.5244 7.77305M11.5244 21.3445C6.00157 21.3445 1.52441 16.8673 1.52441 11.3445C1.52441 5.82163 6.00157 1.34448 11.5244 1.34448C17.0473 1.34448 21.5244 5.82163 21.5244 11.3445C21.5244 16.8673 17.0473 21.3445 11.5244 21.3445Z" stroke="#a0a0a0" stroke-width="2.5"/>
                        </svg> 
                    </a>
                </div>
            </div>
        `;
    }

    //Donelist Section failed message
    donelistEmptyMarkup() {
        const emptyListMarkup = `
            <h2 class="info-title">Done-list is still empty</h2>
        `;
        this.#donelistCardsSection.innerHTML = '';
        this.#donelistCardsSection.insertAdjacentHTML('afterend', emptyListMarkup);
    }
}
export default new DonelistView();