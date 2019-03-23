const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    race: { type: String, default: 'Unknown' },
    sex: { type: String, required: true },
    affilations: [{ type: String }],
    shortStory: { type: String, required: true },
    birhtday: { type: String, default: 'Unknown' },
    height: { type: String, default: 'Unknown' },
    weight: { type: String, default: 'Unknown' },
    weapons: [{ type: String, ref: 'Weapon' }],
    vehicles: [{ type: String, ref: 'Vehicle' }],
    images: [{ type: String, required: true }]
});

module.exports = mongoose.model('Character', CharacterSchema);
