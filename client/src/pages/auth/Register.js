import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Register() {
    
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const { registerUser, user } = useAppContext()

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser(userEmail, userPassword);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate('/journals')
        }
    }, )
    
    return (
        <Wrapper>
            <h2>Welcome Aboard</h2>
            <form onSubmit={handleSubmit} className="form">

                <div className="input-container">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="form-input" type="text" id="name" name="text-data" value={userName} onChange={handleUserNameChange} />
                </div>

                <div>
                    <label htmlFor="email-address" className="form-label">Email</label>
                    <input className="form-input" type="email" id="email-address" name="email-data" value={userEmail} onChange={handleUserEmailChange} />
                </div>
        
                <div>
                    <label htmlFor="user-password" className="form-label">Password</label>
                    <input className="form-input" type="password" id="user-password" name="password-data" value={userPassword} onChange={handleUserPasswordChange} />
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </Wrapper>
    )
}

export default Register;

const Wrapper = styled.main`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(90vh - 10vh);

    h2 {
        margin-bottom: 3rem;
    }

`

