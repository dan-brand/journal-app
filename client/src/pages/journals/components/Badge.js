import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components'

function Badge({ emoji, title, createdAt, journalId }) {
    
    const formattedDate = moment(createdAt).format('Do MMMM YYYY');
    
    return (
        <Wrapper>
            <div className='badge'>
                <div className='emoji'>{emoji}</div>
                <h4>{title}</h4>
                <p className='date'>{formattedDate}</p>
                <Link to={journalId} className='btn btn-primary'>View</Link>
            </div>
        </Wrapper>
    )
}

export default Badge;

const Wrapper = styled.div`
    .date {
        margin-bottom: 2rem;
    }

`