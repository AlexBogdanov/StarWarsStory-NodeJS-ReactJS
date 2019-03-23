const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    years: { type: String },
    story: { type: String },
    charactersInvolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
    images: [{ type: String, required: true }]
});

module.exports = mongoose.model('Story', StorySchema);
