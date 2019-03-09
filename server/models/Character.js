const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    race: { type: String, default: 'Unknown' },
    sex: { type: String, required: true },
    homePlanet: { type: String, default: 'Unknown' },
    affilations: [{ type: String }],
    shortStory: { type: String, required: true },
    birhtday: { type: Date },
    height: { type: Number },
    weight: { type: Number },
    weapons: [{ type: String }],
    specialSkills: [{ type: String }],
    vehicles: [{ type: String }],
    images: [{ type: String }]
});

module.exports = mongoose.model('Character', CharacterSchema);
