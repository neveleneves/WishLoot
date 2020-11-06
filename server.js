const express = require('express');
const path = require('path')
const app = express();


const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();


const assetsItemsBase = [{
    url: 0,
    name: 0,
    model: 0,
    brand: 0,
    image: 0,
    release_date: 0,
    product_category: 0,
    last_sale: 0,
    lowest_ask: 0,
    highest_bid: 0,
}]



app.use(express.static(path.resolve(__dirname, 'dist')))

stockX.newSearchProducts('adidas', {
    limit: 1
})
.then(products => {
    app.get('/base', function (req, res) {
        res.send(products[0])
    })
})
.catch(err => console.log(`Error searching: ${err.message}`));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server on port 3000'))