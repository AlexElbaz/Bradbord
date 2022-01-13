const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

// path starting with . starts from here for the path
const posts = require('./routes/api/posts');
const courses = require('./routes/api/courses');

app.use('/api/posts', posts);
app.use('/api/courses', courses);

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));
    
    // Handle Single Page Application (SPA)
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));