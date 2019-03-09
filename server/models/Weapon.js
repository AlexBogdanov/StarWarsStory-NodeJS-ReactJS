const mongoose = require('mongoose');

const WeaponSchema = new mongoose.Schema({
    name: { type: String, required: true },
    affilations: [{ type: String,  }],
    info: { type: String },
    parts: [{ type: String }],
    images: [{ type: String }],
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

module.exports = mongoose.model('Weapon', WeaponSchema);
