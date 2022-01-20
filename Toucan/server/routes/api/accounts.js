const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

async function loadAccountsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://toucan:toucan@toucan-backend.saudx.mongodb.net/Toucan-backend?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Toucan-backend').collection('accounts');
}

// Get Accounts
router.get('/', async (req, res) => {
    const accounts = await loadAccountsCollection();
    res.send(await accounts.find({}).toArray());
});

// Get Account
router.get('/:id', async (req, res) => {
    const accounts = await loadAccountsCollection();
    res.send(await accounts.find({_id: new mongodb.ObjectId(req.params.id)}).toArray());
});


// Add Account
router.post('/', async (req, res) => {
    const accounts = await loadAccountsCollection();

    await accounts.insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        createdAt: new Date()
    });
    
    res.status(201).send();
});


// Delete Account
router.delete('/:id', async (req, res) => {
    const accounts = await loadAccountsCollection();
    
    await accounts.deleteOne({ _id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
});


// Allows us to use router elsewhere (by imorting elsewhere)
module.exports = router;