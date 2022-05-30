// Dependencies
const express = require('express');
const req = require('express/lib/request');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');



// Middleware
app.use(methodOverride('_method'));
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Route

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));