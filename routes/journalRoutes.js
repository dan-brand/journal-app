const express = require('express');
const router = express.Router();

const { createJournal, getJournals, getJournal, updateJournal, deleteJournal } = require('../controllers/journalController');

router.post('/', createJournal);
router.get('/', getJournals);
router.get('/:journalId', getJournal);
router.patch('/:journalId', updateJournal);
router.delete('/:journalId', deleteJournal);

module.exports = router;