const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();
exports.create = (accessoryData) => Accessory.create(accessoryData);
exports.getOthers = (accessoryId) => Accessory.find({_id: { $nin: accessoryId}});