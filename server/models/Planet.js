const mongoose = require('mongoose');

const PlanetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String },
    affilations: [{ type: String }],
    climate: { type: String },
    terrain: { type: String },
    resource: { type: String },
    natives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
    images: [{ type: String, required: true }]
});

module.exports = mongoose.model('Planet', PlanetSchema);
