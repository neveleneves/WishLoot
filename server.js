const express = require('express');
const path = require('path')
const app = express();
const StockXController = require('./server-assets')

let inputValue;

const BASE = {
    WISHLIST: [],
    DONELIST: []
};

app.use(express.json())

// POST a input-value
app.post('/api/product_data', (req, res) => {
    //Server volition ?
    inputValue = req.body.value;
    res.json({test:1})
})

// GET a database from StockX API
app.get('/api/product_data', (req, res) => {
    StockXController.catchStockXBase(`${inputValue}`).then((result) => {
        res.status(200).json(result);
    });
})


//POST a item from search-results section by click on it
app.post('/api/action_item', (req, res) => {
    //Server volition ?
    
    //if item created
    const item = req.body;
    BASE.WISHLIST.push(item);
    res.status(201).json(item)
})

//GET a Wishlist adata from database
app.get('/api/wishlist_data', (req, res) => {
    //Server volition ?
    res.status(200).json(BASE.WISHLIST);
})

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server on port 3000'))