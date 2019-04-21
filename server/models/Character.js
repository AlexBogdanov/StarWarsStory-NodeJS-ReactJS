const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    race: { type: String, default: 'Unknown' },
    sex: { type: String, required: true },
    affilations: [{ type: String }],
    shortStory: { type: String, required: true },
    height: { type: String, default: 'Unknown' },
    weight: { type: String, default: 'Unknown' },
    weapons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' }],
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spaceship' }],
    images: [{ type: String, required: true }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Character', CharacterSchema);
