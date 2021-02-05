const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishlistItemSchema = new Schema ({
    id: {
        type: String,
        required :true
    },
    url: {
        type: String,
        required :true
    },
    name:{
        type: String,
        required :true
    },
    model: {
        type: String,
        required :true
    },
    brand: {
        type: String,
        required :true
    },
    image_url: {
        type: String,
        required :true
    },
    image_url_small: {
        type: String,
        required :true
    },
    release_date: {
        type: String,
        required :true
    },
    product_category: {
        type: String,
        required :true
    },
    last_sale_price: {
        type: Number,
        required :true
    }, 
    lowest_ask_price: {
        type: Number,
        required :true
    },
    highest_bid_price: {
        type: Number,
        required :true
    },
})
module.exports = mongoose.model('wishlist-cards', wishlistItemSchema)