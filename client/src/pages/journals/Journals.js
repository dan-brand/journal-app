import { useEffect } from 'react';
import Badge from './components/Badge';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from "../../context/appContext";


function Journals() {
    
    const { journals, getJournalsData } = useAppContext();

    useEffect(() => {
        getJournalsData();
    }, [])
    
    const renderedJournals = journals.map((journal, index) => {
        return (
            <Badge key={index} emoji={journal.emoji} title={journal.title} createdAt={journal.createdAt} journalId={journal._id} />
        )
    })

    return (
        <Wrapper>
            <nav className='journal-header'>
                <h4>My Journals</h4>
                <Link to='create' className='btn btn-primary'>Create Journal</Link>
            </nav>

            <section className='journal-grid'>
                {renderedJournals}
            </section>
        </Wrapper>
    )
}

export default Journals

const Wrapper = styled.main`

.journal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4rem;
    margin-top: 4rem;
}

.journal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    row-gap: 3rem;
}

.badge {
    border: 2px solid var(--grey-light);
    padding: 3rem;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}




`


