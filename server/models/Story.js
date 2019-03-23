const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    years: { type: String },
    story: { type: String },
    images: [{ type: String }]
});

module.exports = mongoose.model('Story', StorySchema);
