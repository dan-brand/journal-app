// --------------------------------- IMPORTS --------------------------------- //
const Journal = require('../models/Journal');
const mongoose = require('mongoose');
const { BadRequestError } = require('../errors/errors')

// --------------------------------- CREATE JOURNAL --------------------------------- //

const createJournal = async (req, res, next) => {
    
    const { title, type, emoji, entry } = req.body;
    const { _id } = req.user; 

    if (!title || !type || !entry ) {
        return next(new BadRequestError('Provide title, type and entry'));
    }

    try {
        const newJournal = await Journal.create({ title, type, emoji, entry, createdBy: _id });
        res.status(201).json({ newJournal })
    } catch(error) {
        next(error);
    }
}

// --------------------------------- GET JOURNALS --------------------------------- //

const getJournals = async (req, res, next) => {

    const { _id } = req.user; // from auth middleware

    try {
        const allJournals = await Journal.find({ createdBy: _id });

        if (allJournals.length === 0) { // not sure if I actually want to make this an error...
            return res.status(404).json({msg: 'No journals'})
        }

        res.status(200).json({ allJournals })
    } catch(error) {
        console.log(error)
        next(error)
    }
        
}

// --------------------------------- GET JOURNAL --------------------------------- //

const getJournal = async (req, res, next) => {

    const { _id } = req.user; 
    const { journalId } = req.params;

    // validation
    if (!mongoose.Types.ObjectId.isValid(journalId)) { 
        return next(new Error('Not correct mongo id type'));
    }

    try {
        const journal = await Journal.findOne({ _id: journalId });

        if (!journal) {
            return next(new Error('No journal exists'));
        }

        if (journal.createdBy.toString() !== _id.toString()) {
            return next(new Error('You are not authorized to access this journal'));
        }

        res.status(200).json({ journal })
    } catch(error) {
        next(error)
    }    

}

// --------------------------------- UPDATE JOURNAL --------------------------------- //

const updateJournal = async (req, res, next) => {

    const { title, type, entry } = req.body;
    const { journalId } = req.params;
    const { _id } = req.user; 

    
    // validation
    if (!title || !entry ) {
        return next(new Error('Provide title, type and entry'));
    }
    
    if (!mongoose.Types.ObjectId.isValid(journalId)) {
        return next(new Error('Not correct mongo id type'));
    }
    
    const journal = await Journal.findOne({ _id: journalId });

    if (!journal) {
        return next(new Error('No journal exists'));
    }

    if (journal.createdBy.toString() !== _id.toString()) {
        return next(new Error('You are not authorized to access this journal'));
    }

    try {
        const journal = await Journal.findOneAndUpdate({ _id: journalId }, req.body, {new: true}) 
        res.status(200).json({ journal })
    } catch(error) {
        next(error)
    }

    
}

// --------------------------------- DELETE JOURNAL --------------------------------- //

const deleteJournal = async (req, res, next) => {

    // validation

    const { journalId } = req.params;

    // permission check
    const { _id } = req.user; // from auth middleware
    
    
    if (!mongoose.Types.ObjectId.isValid(journalId)) {
        return next(new Error('Not correct mongo id type'));
    }
    
    const journal = await Journal.findOne({ _id: journalId });

    if (!journal) {
        return next(new Error('No journal exists'));
    }

    if (journal.createdBy.toString() !== _id.toString()) {
        return next(new Error('You are not authorized to access this journal'));
    }

    try {
        await Journal.findOneAndDelete({ _id: journalId });
        res.status(200).json({ msg: 'Journal deleted' })
    } catch(error) {
        next(error)
    }
    
}

// --------------------------------- EXPORT --------------------------------- //


module.exports = { createJournal, getJournals, getJournal, updateJournal, deleteJournal }