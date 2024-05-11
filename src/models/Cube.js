const mongoose = require('mongoose');
const Accessory = require('./Accessory');

const cubeSchema = new mongoose.Schema({
    name:{
      type:String,
      required: true,
      unique: true,
      minLength: 5,
      match: /^[A-Za-z0-9]+$/,
    },
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
      type:mongoose.Types.ObjectId,
      ref:'User',
    }
});

const Cube = mongoose.model('Cube',cubeSchema);

module.exports = Cube;