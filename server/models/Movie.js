const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: Number, enum: [0, 1, 2, 3] },
    releaseDate: { type: Date, required: true },
    director: { type: String },
    writers: [{ type: String }],
    actors: [{ type: String }],
    info: { type: String, required: true },
    charactersInvolved: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },
    cover: { type: String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);
