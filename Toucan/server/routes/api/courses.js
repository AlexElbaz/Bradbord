const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

async function loadCoursesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://toucan:toucan@toucan-backend.saudx.mongodb.net/Toucan-backend?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Toucan-backend').collection('courses');
}

// Get Courses
router.get('/', async (req, res) => {
    const courses = await loadCoursesCollection();
    res.send(await courses.find({}).toArray());
});

// Get Course
router.get('/:id', async (req, res) => {
    const courses = await loadCoursesCollection();
    res.send(await courses.find({_id: new mongodb.ObjectId(req.params.id)}).toArray());
});


// Add Course
router.post('/', async (req, res) => {
    const courses = await loadCoursesCollection();

    await courses.insertOne({
        name: req.body.name,
        courseCode: req.body.courseCode,
        teacher: req.body.teacher,
        members: req.body.members,
        time: req.body.time,
        img: req.body.img,
        modalID: req.body.modalID,
        createdAt: new Date()
    });
    
    res.status(201).send();
});


// Delete Course
router.delete('/:id', async (req, res) => {
    const courses = await loadCoursesCollection();
    
    await courses.deleteOne({ _id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
});


// Allows us to use router elsewhere (by imorting elsewhere)
module.exports = router;