const express = require('express');
const path = require('path')
const app = express();
const StockXController = require('./server-assets')

let inputValue;

let BASE = {
    WISHLIST: [],
    DONELIST: []
};

app.use(express.json())

// POST a input-value
app.post('/api/product_data', (req, res) => {
    //Server volition ?
    inputValue = req.body.value;
    res.json({message: 'Value has been saved'})
})

// GET a database from StockX API
app.get('/api/product_data', (req, res) => {
    StockXController.catchStockXBase(`${inputValue}`).then((result) => {
        res.status(200).json(result);
    });
})

//POST a item from search-results section by click on it for add
app.post('/api/action_item', (req, res) => {
    //Server volition ?
    
    const item = req.body;
    BASE.WISHLIST.push(item);
    res.status(201).json(item)
})

//DELETE a item from BASE
app.delete('/api/action_item/:id', (req, res) => {
    //Server volition ?

    BASE.WISHLIST = BASE.WISHLIST.filter(item => item.id !== req.params.id)
    res.status(200).json({
        id: req.params.id,
        message: 'Product has been delete'
    })
})

//GET a Wishlist data from database
app.get('/api/wishlist_data', (req, res) => {
    //Server volition ?
    res.status(200).json(BASE.WISHLIST);
})

//GET a Donelist data from database
app.get('/api/donelist_data', (req, res) => {
    //Server volition ?
    res.status(200).json(BASE.DONELIST);
})

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server on port 3000'))