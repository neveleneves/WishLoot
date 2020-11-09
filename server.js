const express = require('express');
const path = require('path')
const app = express();

const assetsItemsBase = [
    {id: 0, url:0, name: 0, model: 0, brand: 0, image_url: 0, release_date: 0,  product_category: 0,last_sale_price: 0,  lowest_ask_price: 0,  highest_bid_price: 0}
]

// const StockXAPI = require('stockx-api');
// const stockX = new StockXAPI();
// let dataProduct;
// stockX.newSearchProducts('adidas', {
//     limit: 1
// })
// .then(products => dataProduct = products)
// .catch(err => console.log(`Error searching: ${err.message}`));

// app.get('/api/product_data', (req, res) => {
//     res.status(200).json(dataProduct);
// })


app.use(express.json())

// GET a database 
app.get('/api/product_data', (req, res) => {
    res.status(200).json(assetsItemsBase);
})

// POST a input-value
app.post('/api/product_data', (req, res) => {
    console.log(req.body)
    res.json({test:1})
})


app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server on port 3000'))