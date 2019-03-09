const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    name: { type: String },
    years: { type: String },
    story: { type: String },
    charactersInvolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

module.epxorts = mongoose.model('Story', StorySchema);
