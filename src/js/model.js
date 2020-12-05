import {addActionSection, ajaxRequest, removeActionSection, searchById} from './helpers.js'

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
        } else {
            state.search.results = [];
        }
    } catch (error) {
        console.warn(`Something is wrong with the Search Result model:`, error);
    }
};


//Model for the functional of adding/remove item to the Wishlist
export const actionSearchResults = async (item) => {
    try {
        item.sectionName = 'search_results';

        if(item.action === 'add') {
            state.wishlist = await addActionSection(state.search.results, state.wishlist, item);
        } else if (item.action === 'delete') {
            state.wishlist = await removeActionSection(state.wishlist, item);
        }
    } catch (error) {
        console.warn(`Something is wrong with the Search-Results Action model:`, error);
    }
};

//Model for the load Wishlist
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

//Model for the load Donelist
export const loadDonelist = async () => {
    try {
        const donelistBase =  await ajaxRequest('/api/donelist_data');
        if(donelistBase) {
            state.donelist = donelistBase;
        } 
    } catch (error) {
        console.warn(`Something is wrong with the Load Donelist model:`, error);
    }
};

//Model for the functional of Sections
export const actionSections = async(changedSection) => {
    try {
        if(changedSection.action === 'delete') {
            if(changedSection.sectionName === 'wishlist')
            state.wishlist = await removeActionSection(state.wishlist, changedSection);
            else if(changedSection.sectionName === 'donelist')
            state.donelist = await removeActionSection(state.donelist, changedSection);
        }
        else if(changedSection.action === 'add') {
            if(changedSection.sectionName === 'wishlist') {
                state.donelist = await addActionSection(state.wishlist, state.donelist, changedSection);
                state.wishlist = await removeActionSection(state.wishlist, changedSection);

            } else if(changedSection.sectionName === 'donelist') {
                state.wishlist = await addActionSection(state.donelist, state.wishlist, changedSection);
                state.donelist = await removeActionSection(state.donelist, changedSection);
            }
        }
    }
    catch (error) {
        console.warn(`Something is wrong with the Action Sections model:`, error);
    }
}