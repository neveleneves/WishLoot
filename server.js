const express = require('express');
const path = require('path')
const app = express();

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./keys')

const blogRouter = require('./routes/blog')
const wishlistRouter = require('./routes/wishlist')
const donelistRouter = require('./routes/donelist')

const StockXController = require('./server-assets')

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/api/blog', blogRouter)
app.use('/api/wishlist-data', wishlistRouter)
app.use('/api/donelist-data', donelistRouter)

app.use(express.json())

// let inputValue;
// let BASE = {
//     WISHLIST: [],
//     DONELIST: [],
// };

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

// //POST a item from search-results section by click on it for add
// app.post('/api/action_search_results/:id', (req, res) => {
//     //Server volition ?
//     const item = req.body;
//     BASE.WISHLIST.push(item);
//     res.status(201).json(item)
// })

// //DELETE a item from WISHLIST BASE by Search Results section
// app.delete('/api/action_search_results/:id', (req, res) => {
//     //Server volition ?

//     BASE.WISHLIST = BASE.WISHLIST.filter(item => item.id !== req.params.id)
//     res.status(200).json({
//         id: req.params.id,
//         message: 'Product has been delete'
//     })
// })

// //GET a Wishlist data from database
// app.get('/api/wishlist_data', (req, res) => {
//     //Server volition ?
//     res.status(200).json(BASE.WISHLIST);
// })

// //GET a Donelist data from database
// app.get('/api/donelist_data', (req, res) => {
//     //Server volition ?
//     res.status(200).json(BASE.DONELIST);
// })

// //DELETE a item from BASE WISHLIST
// app.delete('/api/action_wishlist/:id', (req, res) => {
//     BASE.WISHLIST = BASE.WISHLIST.filter(item => item.id !== req.params.id)
//     res.status(200).json({
//         id: req.params.id,
//         message: 'Wishlist product has been delete'
//     })
// })

// //DELETE a item from BASE DONELIST
// app.delete('/api/action_donelist/:id', (req, res) => {
//     BASE.DONELIST = BASE.DONELIST.filter(item => item.id !== req.params.id)
//     res.status(200).json({
//         id: req.params.id,
//         message: 'Donelist product has been delete'
//     })
// })

// //POST a item from wishlist-section by click on it for add to donelist
// app.post('/api/action_wishlist/:id', (req, res) => {
//     //Server volition ?
    
//     const item = req.body;
//     BASE.DONELIST.push(item);
//     res.status(201).json(item)
// })

// //POST a item from donelist-section by click on it for add to wishlist
// app.post('/api/action_donelist/:id', (req, res) => {
//     //Server volition ?
    
//     const item = req.body;
//     BASE.WISHLIST.push(item);
//     res.status(201).json(item)
// })

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

// app.listen(3000, () => console.log('Server on port 3000'))