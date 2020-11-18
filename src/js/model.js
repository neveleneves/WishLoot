import {ajaxRequest} from './helpers.js'

//Main state variable
export const state = {
    item: {},
    search: {
        query: '',
        results: [],
    },
    wishlist: [

    ],
    donelist :[

    ]
};

//Model for Search section
export const loadSearchResults = async (query) => {
    try {
        //Send input-value to server for catching search results
        const searchValueResponse = await ajaxRequest('/api/product_data', 'POST', query);

        //Catch a data from StockX 
        const searchResultsResponse = await ajaxRequest('/api/product_data');

        //Handling results from server and API StockX
        // console.log(searchResultsResponse);
        if (searchResultsResponse) {
            state.search.query = query;
            state.search.results = searchResultsResponse.map(res => {
                return {
                    id: res.url,
                    url: res.url,
                    name: res.name,
                    model: res.model,
                    brand: res.brand,
                    image_url: res.media.imageUrl, 
                    image_url_small: res.media.smallImageUrl, 
                    release_date: res.release_date, 
                    product_category: res.product_category,
                    last_sale_price: res.last_sale,  
                    lowest_ask_price: res.lowest_ask,  
                    highest_bid_price: res.highest_bid 
                }
            });
            // console.log(state.search.results);
        } else {
            state.search.results = [];
        }
    } catch (error) {
        console.warn(`Something is wrong with the model:`, error);
    }
};


//Model for the functional of adding to the Wishlist
export const addToWishlist = (item) => {
    //Add item to the Wishlist
    // state.wishlist.push(item);
};