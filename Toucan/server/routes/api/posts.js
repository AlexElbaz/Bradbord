const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://toucan:toucan@toucan-backend.saudx.mongodb.net/Toucan-backend?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Toucan-backend').collection('posts');
}


// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Get Post
router.get('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({_id: new mongodb.ObjectId(req.params.id)}).toArray());
});


// Add post (to class)
router.post('/:classid', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.insertOne({
        title: req.body.title,
        body: req.body.body,
        type: req.body.type,
        createdAt: new Date()
    });
    
    res.status(201).send();
});


// Delete posts
router.delete('/:postid', async (req, res) => {
    const posts = await loadPostsCollection();
    
    await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
});


// Allows us to use router elsewhere (by imorting elsewhere)
module.exports = router;