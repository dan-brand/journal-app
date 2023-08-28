
import styled from 'styled-components';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import journalEmojis from '../../assets/utils/journalEmojis';

function CreateJournal() {
    
    const [journalTitle, setJournalTitle] = useState('');
    const [journalType, setJournalType] = useState('reflection');
    const [journalEntry, setJournalEntry] = useState('');
    const [journalEmoji, setJournalEmoji] = useState('');

    const { createJournal, journal } = useAppContext();

    const handleJournalTitleChange = (event) => {
        setJournalTitle(event.target.value)
    }

    const handleJournalEntryChange = (event) => {
        setJournalEntry(event.target.value);
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

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        createJournal(journalTitle, journalType, journalEmoji, journalEntry)
        navigate(`/journals/${journal._id}`) //This is not working, not sure why
    }

    const renderedOptions = journalEmojis.map((emojiObject) => {
        return (
            <option>{emojiObject.type}</option>
        )
    })

    
    return (
        <Wrapper>
            <h3>Create Journal</h3>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <label htmlFor="jounral-title" className='form-label'>Title</label>
                    <input className='form-input' type="text" id="jounral-title" name="title-data" value={journalTitle} onChange={handleJournalTitleChange} />
                </div>

                <div>
                    <label htmlFor="journal-type" className="form-label">Journal Type</label>
                    <select className='form-select' onChange={handleJournalTypeChange} value={journalType} id="journal-type"  name="type-data">
                        {renderedOptions}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="journal-entry" className='form-label'>Entry</label>
                    <textarea className='form-input entry' type="text" id="journal-entry" name="entry-data" value={journalEntry} onChange={handleJournalEntryChange} />
                </div>

                <button className='btn btn-primary-inverse' onClick={() => navigate('/journals')}>Cancel</button>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </Wrapper>
    )
}

export default CreateJournal;

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