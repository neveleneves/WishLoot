import {ajaxRequest} from './helpers.js'

//Main state variable
export const state = {
    item: {},
    search: {
        query: '',
        results: [],
    }
};

//
export const loadSearchResults = async function(query) {
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
        } else {
            //DOM "No results"
        }
    } catch (error) {
        console.error(`${error}`);
        throw error;
    }
};

