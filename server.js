const express = require('express');
const path = require('path')
const app = express();

const assetsItemsBase = [
    {id: 0, url:0, name: 0, model: 0, brand: 0, image_url: 0, release_date: 0,  product_category: 0,last_sale_price: 0,  lowest_ask_price: 0,  highest_bid_price: 0}
]

app.get('api/product_data', (req, res) => {
    res.status(200).json(assetsItemsBase);
})

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server on port 3000'))