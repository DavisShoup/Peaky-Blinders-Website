// Dependencies
const express = require('express');
const req = require('express/lib/request');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const db = mongoose.connection;
const homePage = require('./controllers/users.js');
const routerHorse = require('./controllers/horse.js')
const routerIndex = require('./controllers/index.js')

// Database Connection

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use('/homepage', homePage);
app.use('/', routerHorse);
app.use('/', routerIndex);

// Route

// Database Connection Error / Success

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Listener

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));