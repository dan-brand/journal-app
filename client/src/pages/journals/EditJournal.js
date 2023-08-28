import { useState } from 'react';
import styled from 'styled-components';
import journalEmojis from '../../assets/utils/journalEmojis';


function EditJournal({ title, type, emoji, entry, updateJournal, journalId, showEdit, setShowEdit }) {
    
    const [journalTitle, setjournalTitle] = useState(title);
    const [journalEntry, setJournalEntry] = useState(entry);
    const [journalType, setJournalType] = useState(type);
    const [journalEmoji, setJournalEmoji] = useState(emoji);

    
    const handleJournalTitleChange = (event) => {
        setjournalTitle(event.target.value)
    }

    const handleJournalEntryChange = (event) => {
        setJournalEntry(event.target.value)
    }

    const handleJournalTypeChange = (event) => {
        setJournalType(event.target.value);
        const emojiObject = journalEmojis.find((entry) => {
            return entry.type === event.target.value
        });
        if (emojiObject) {
            setJournalEmoji(emojiObject.emoji);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateJournal(journalTitle, journalEntry, journalType, journalEmoji, journalId)
        setShowEdit(!showEdit);
    }

    const handleToggleJournal = () => {
        setShowEdit(!showEdit);
    }

    const renderedOptions = journalEmojis.map((emojiObject) => {
        return (
            <option>{emojiObject.type}</option>
        )
    })


    return (    
        <Wrapper>
            <h3>Edit Journal</h3>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="title" className='form-label'>Title</label>
                <input className='form-input' type="text" id="title" name="title-data" value={journalTitle} onChange={handleJournalTitleChange} />

                <div>
                    <label htmlFor="journal-type" className="form-label">Journal Type</label>
                    <select className='form-select' onChange={handleJournalTypeChange} value={journalType} id="journal-type"  name="type-data">
                        {renderedOptions}
                    </select>
                </div>

                <label htmlFor="journal-entry" className='form-label'>Entry</label>
                <textarea className='form-input entry' type="text" id="journal-entry" name="entry-data" value={journalEntry} onChange={handleJournalEntryChange} />

                <button className='btn btn-primary-inverse' onClick={handleToggleJournal}>Cancel</button>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </Wrapper>
    )
}

export default EditJournal;

const Wrapper = styled.main`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(90vh - 10vh);

    .entry {
        height: 20rem;
     
    }

`