import {ajaxRequest} from './helpers.js'

export const state = {
    item: {},
    search: {
        query: '',
        results: [],
    }
};

export const loadSearchResults = async function(query) {
    try {
        //Send input-value to server for catching search results
        const searchValueResponse = await ajaxRequest('/api/product_data', 'POST', query);

        //Catch a data from StockX 
        const searchResultsResponse = await ajaxRequest('/api/product_data');
        
        //Handling results from server and API StockX
        if (searchResultsResponse) {
            //Get a necessary data to obj
            // let searchResults = [];
            // searchResultsResponse.forEach(el => {
            //     let result = {
            //         id: el.id,
            //         url: `https://stockx.com/${el.url}`,
            //         name: el.name,
            //         model: el.model,
            //         brand: el.brand,
            //         image_url: el.media.imageUrl, 
            //         release_date: el.release_date, 
            //         product_category: el.product_category,
            //         last_sale_price: el.last_sale,  
            //         lowest_ask_price: el.lowest_ask,  
            //         highest_bid_price: el.highest_bid
            //     } 
            //     searchResults.push(result);
            // });
            // console.log(searchResults);

            state.search.query = query;
            state.search.results = searchResultsResponse.map(res => {
                return {
                    id: res.id,
                    url: `https://stockx.com/${res.url}`,
                    name: res.name,
                    model: res.model,
                    brand: res.brand,
                    image_url: res.media.imageUrl, 
                    release_date: res.release_date, 
                    product_category: res.product_category,
                    last_sale_price: res.last_sale,  
                    lowest_ask_price: res.lowest_ask,  
                    highest_bid_price: res.highest_bid 
                }
            });

            //Rendering a products in a search results field
            // const searchList = document.querySelector('.search-result-list');
            // const markup = `
            //     <li class="search-list-item">
            //         <div class="example-search-card-result">
            //             <img src="${searchResults.image_url}" alt="${searchResults.name}" class="example-search-card-img">
            //             <div class="example-search-card-info">
            //                 <h2 class="example-search-card-title">${searchResults.name}</h2>
            //                 <h3 class="example-search-card-brand">${searchResults.brand}</h3>
            //             </div>
            //         </div>
            //         <div class="wrapper-search-item-nav">
            //             <a class="add-search-card">
            //                 <svg class="add-search-button" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                     <path d="M11.6667 6.66669V16.6667M6.66675 11.6667H16.6667M11.6667 21.6667C6.1439 21.6667 1.66675 17.1895 1.66675 11.6667C1.66675 6.14384 6.1439 1.66669 11.6667 1.66669C17.1896 1.66669 21.6667 6.14384 21.6667 11.6667C21.6667 17.1895 17.1896 21.6667 11.6667 21.6667Z" stroke="#828282" stroke-width="2"/>
            //                 </svg>
            //             </a>
            //             <a class="add-done-search-card">
            //                 <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                     <path d="M1.53345 13.7333L8.43345 20.6333L21.4668 4.59998" stroke="#06924c" stroke-width="3" stroke-linecap="square"/>
            //                 </svg>
            //             </a>
            //         </div>
            //     </li>
            // `;
            // searchResults.innerHTML = '';
            // searchList.insertAdjacentHTML('afterbegin', markup);
        } else {
            //DOM "No results"
        }
    } catch (error) {
        console.error(`${error}`);
        throw error;
    }
};

