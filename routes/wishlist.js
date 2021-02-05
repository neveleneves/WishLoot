const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')

router.get('/', async (req, res) => {
    const wishlist = await Wishlist.find({})
    res.status(200).json(wishlist)
})

router.post('/', async (req, res) => {
    const wishlistCard = req.body;

    const card = new Wishlist(wishlistCard)

    await card.save()
    res.status(201).json(card)
})

router.delete('/:id', async (req, res) => {
    await Wishlist.remove({id: req.params.id}) //
    res.status(200).json({
        message: 'Item Deleted'
    })
})

module.exports = router