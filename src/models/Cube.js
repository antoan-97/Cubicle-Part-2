const mongoose = require('mongoose');
const Accessory = require('./Accessory');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }]
})

const Cube = mongoose.model('Cube',cubeSchema);

module.exports = Cube;