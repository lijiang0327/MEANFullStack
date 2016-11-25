'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let HumanSchema = new Schema({
    name: String,
    age: Number
});

let Model = mongoose.model('Human', HumanSchema);

module.exports = Model;