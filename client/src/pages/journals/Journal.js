import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { HiPencil, HiTrash } from "react-icons/hi";
import EditJournal from "./EditJournal";
import styled from 'styled-components';
import moment from 'moment';

import { useAppContext } from "../../context/appContext";

function Journal() {
    
    const { journal, getJournalData, updateJournal, deleteJournal, journals } = useAppContext();

    const [showEdit, setShowEdit] = useState(false);
    
    const { journalId } = useParams() // A recat-router hook that allows us to easily get the paramter Id in the URL

    const formattedDate = moment(journal.createdAt).format('Do MMMM YYYY');

    const navigate = useNavigate();

    const journalBelongsToUser = journals.some((journal) => {
        return journal._id === journalId
    });

    useEffect(() => {
        if (!journalBelongsToUser) {
            navigate('/journals');
        } else {
            getJournalData(journalId);
        }
    }, []);

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    const handleDelete = (journalId) => {
        deleteJournal(journalId);
        navigate('/journals')
    }



    return (
        <Wrapper>
        {
           showEdit ?
           <EditJournal title={journal.title} type={journal.type} emoji={journal.emoji} entry={journal.entry} updateJournal={updateJournal} journalId={journalId} showEdit={showEdit} setShowEdit={setShowEdit} /> :
           <div className="inner-container">
                <nav className="journal-navigation">
                    <div className="journal-heading-container">
                        <div className='emoji'>
                            {journal.emoji}
                        </div>
                        <div>
                            <h3>{journal.title}</h3>
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                    <div className="journal-actions-container">
                        <HiPencil className="react-icon" onClick={handleEditClick} />
                        <HiTrash className="react-icon" onClick={() => handleDelete(journalId)} />
                    </div>
                </nav>
                <section>
                    <p>{journal.entry}</p>
                </section> 
           </div>
        }
        </Wrapper>
    )
}

export default Journal;

const Wrapper = styled.div`

margin-top: 6rem;

.journal-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
}

.journal-heading-container {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.journal-actions-container {
    display: flex;
    gap: 1rem;
}

.react-icon {
    font-size: 3rem;
    color: var(--dark-grey);
}


`