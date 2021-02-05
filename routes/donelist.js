const express = require('express')
const router = express.Router()
const Donelist = require('../models/Donelist')

router.get('/', async (req, res) => {
    const donelist = await Donelist.find({})
    res.status(200).json(donelist)
})

router.post('/', async (req, res) => {
    const donelistCard =  req.body;

    const card = new Donelist(donelistCard)

    await card.save()
    res.status(201).json(card)
})

router.delete('/:id', async (req, res) => {
    await Donelist.remove({id: req.params.id}) 
    res.status(200).json({
        message: 'Item Deleted'
    })
})

module.exports = router