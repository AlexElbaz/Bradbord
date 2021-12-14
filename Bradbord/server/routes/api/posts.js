const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    
    res.status(201).send();
});

// Delete posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    
    await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://brad:bord@bradbord-backend.saudx.mongodb.net/Bradbord-Backend?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Bradbord-backend').collection('posts');
}

// Allows us to use router elsewhere (by imorting elsewhere)
module.exports = router;