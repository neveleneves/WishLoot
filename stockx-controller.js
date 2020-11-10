const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();

module.exports = { 
    catchStockXBase: async function(requestValue) {
        const data = stockX.newSearchProducts(`${requestValue}`, {
            limit: 10
        })
        .then(products => {
            return products;
        })
        .catch(err => console.log(`Error searching: ${err.message}`));
        return data;
    }
};