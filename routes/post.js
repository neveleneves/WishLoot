const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.status(200).json(posts)
})

router.post('/', async (req, res) => {
    console.log(req.files);
    const postData = {
        img: req.body.img,
        title: req.body.title,
        content: req.body.content
    }

    const post = new Post(postData)

    await post.save()
    res.status(201).json(post)
})

router.delete('/:id', async (req, res) => {
    await Post.remove({_id: req.params.id}) //
    res.status(200).json({
        message: 'Post Deleted'
    })
})

module.exports = router