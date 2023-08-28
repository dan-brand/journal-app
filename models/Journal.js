const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, 'Please provide an interest title'],
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['task', 'event', 'note', 'idea', 'mood', 'goal', 'habit', 'gratitude', 'quote', 'memory', 'reflection'],
        default: 'task',
        required: [true, 'Please provide a type']
    },
    emoji: {
        type: String
    },
    entry: {
        type: String,
        required: [true, 'Please provide an entry']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: [true, 'Please provide user']
    },
}, { timestamps: true })

module.exports = mongoose.model('Journal', JournalSchema);


