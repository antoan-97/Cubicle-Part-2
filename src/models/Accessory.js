const mongoose = require('mongoose');

const accesssorySchema = new mongoose.Schema({
 name: String,
 description: String,
 imageUrl: String,
});

const Accessory = mongoose.model('Accessory',accesssorySchema);

module.exports = Accessory;