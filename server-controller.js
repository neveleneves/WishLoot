const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();

stockX.newSearchProducts('yeezy', {
    limit: 5
})
.then(products => console.log(products.id))
.catch(err => console.log(`Error searching: ${err.message}`));
