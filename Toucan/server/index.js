const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require("./config/db.config");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

//Middleware
//app.use(bodyParser.json());
app.use(cors(corsOptions)); // bezkoder guide says to do app.use(cors(corsOptions)); here but it's been working like this so far

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

// path starting with . starts from here for the path
const posts = require('./routes/api/posts');
const courses = require('./routes/api/courses');
const accounts = require('./routes/api/accounts');

app.use('/api/posts', posts);
app.use('/api/courses', courses);
app.use('/api/accounts', accounts);

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect('mongodb+srv://toucan:toucan@toucan-backend.saudx.mongodb.net/Toucan-backend?retryWrites=true&w=majority', {})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));
    
    // Handle Single Page Application (SPA)
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        console.log(count);
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }