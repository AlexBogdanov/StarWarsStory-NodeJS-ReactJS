const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    years: { type: String },
    story: { type: String },
    images: [{ type: String }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Story', StorySchema);
