import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function Login() {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const { loginUser, user } = useAppContext();

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email', userEmail, 'Password', userPassword);
        loginUser(userEmail, userPassword);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate('/journals')
        }
    }, [user, navigate]) //included navigate to prevent errors

    return ( 
        <Wrapper>
            <h2>Welcome Back!</h2>
            <form onSubmit={handleSubmit} className="form">

                <div className="input-container">
                    <label className="form-label" htmlFor="email-address">Email</label>
                    <input className="form-input" type="email" id="email-address" name="email-data" value={userEmail} onChange={handleUserEmailChange} />
                </div>

                <div>
                    <label className="form-label" htmlFor="user-password">Password</label>
                    <input className="form-input" type="password" id="user-password" name="password-data" value={userPassword} onChange={handleUserPasswordChange} />
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </Wrapper>
    )
}

export default Login;


const Wrapper = styled.main`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(90vh - var(--nav-height));

    h2 {
        margin-bottom: 3rem;
    }

`