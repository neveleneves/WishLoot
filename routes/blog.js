const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')

router.get('/', async (req, res) => {
    const posts = await Blog.find({})
    res.status(200).json(posts)
})

router.post('/', async (req, res) => {
    const postData = {
        img: req.body.img,
        title: req.body.title,
        content: req.body.content
    }

    const post = new Blog(postData)

    await post.save()
    res.status(201).json(post)
})

router.delete('/:id', async (req, res) => {
    await Blog.remove({_id: req.params.id}) //
    res.status(200).json({
        message: 'Post Deleted'
    })
})

module.exports = router