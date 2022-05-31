const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horseSchema = new Schema({
    horseName: { type: String },
    breed: { type: String },
    height: { type: Number},
    color: { type: String },
    number: { type: Number },
    horseShoe: { type: String },
    jockeyName: {type: String},
})

const userSchema =  new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    horse: [horseSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;