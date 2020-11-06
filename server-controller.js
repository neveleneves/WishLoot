const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();

stockX.newSearchProducts('adidas', {
    limit: 1
})
.then(products => console.log(products[0]))
.catch(err => console.log(`Error searching: ${err.message}`));
