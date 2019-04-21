const mongoose = require('mongoose');

const SpaceshipSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    dimension: { type: String, required: true },
    affilations: [{ type: String }],
    info: { type: String },
    images: [{ type: String }],
    pilots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Spaceship', SpaceshipSchema);
