import {ajaxRequest, searchById} from './helpers.js'

//Main state variable
export const state = {
    item: {},
    search: {
        query: '',
        results: [],
    },
    wishlist: [],
    donelist: []
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
        console.warn(`Something is wrong with the Search Result model:`, error);
    }
};


//Model for the functional of adding/remove item to the Wishlist
export const actionWishlist = async (item) => {
    try {
        //Searching item in search results list by ID
        const itemForHandling = searchById(state.search.results, item);

        if(item.action) {
            const addItemResponce = await ajaxRequest('/api/action_item', 'POST', itemForHandling);
            state.wishlist.push(addItemResponce);
        } else if (!item.action) {
            const removeItemResponce = await ajaxRequest(`/api/action_item/${item.id}`, 'DELETE');
            state.wishlist = state.wishlist.filter(productWishlist => productWishlist.id !== item.id)
        }
    } catch (error) {
        console.warn(`Something is wrong with the Wishlist Action model:`, error);
    }
};

//Model for the functional of adding to the Wishlist
export const loadWishlist = async () => {
    try {
        const wishlistBase =  await ajaxRequest('/api/wishlist_data');
        
        if(wishlistBase) {
            state.wishlist = wishlistBase;
        } 
    } catch (error) {
        console.warn(`Something is wrong with the Load Wishlist model:`, error);
    }
};

//Model for the functional of adding to the Donelist
export const loadDonelist = async () => {
    try {
        const donelistBase =  await ajaxRequest('/api/donelist_data');
        if(donelistBase) {
            state.donelist = donelistBase;
        } 
    } catch (error) {
        console.warn(`Something is wrong with the Main Donelist model:`, error);
    }
};