const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: Number, enum: [0, 1, 2, 3], required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String },
    writers: [{ type: String }],
    actors: [{ type: String }],
    info: { type: String, required: true },
    cover: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);
