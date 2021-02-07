const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donelistItemSchema = new Schema ({
    id: {
        type: String,
        required :false
    },
    url: {
        type: String,
        required :false
    },
    name:{
        type: String,
        required :false
    },
    model: {
        type: String,
        required :false
    },
    brand: {
        type: String,
        required :false
    },
    image_url: {
        type: String,
        required :false
    },
    image_url_small: {
        type: String,
        required :false
    },
    release_date: {
        type: String,
        required :false
    },
    product_category: {
        type: String,
        required :false
    },
    last_sale_price: {
        type: Number,
        required :false
    }, 
    lowest_ask_price: {
        type: Number,
        required :false
    },
    highest_bid_price: {
        type: Number,
        required :false
    },
})
module.exports = mongoose.model('donelist-cards', donelistItemSchema)