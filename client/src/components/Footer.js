import styled from 'styled-components';
import { PiFacebookLogoFill, PiInstagramLogoFill, PiTiktokLogoFill, PiLinkedinLogoFill, PiYoutubeLogoFill, PiHeartFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';



function Footer() {

    return(
        <Wrapper>
          <h5>quill.com</h5>
          <div className='social-icon-container'>
            <PiFacebookLogoFill className='social-icon' />
            <PiInstagramLogoFill className='social-icon' />
            <PiTiktokLogoFill className='social-icon' />
            <PiLinkedinLogoFill className='social-icon' />
            <PiYoutubeLogoFill className='social-icon' />
          </div>
          <ul className='links-container'>
            <li><NavLink to='/' className='footer-link'>Home</NavLink></li>
            <li><NavLink to='/login' className='footer-link'>Login</NavLink></li>
            <li><NavLink to='/register' className='footer-link'>Register</NavLink></li>
          </ul>
          <div className='bottom-text'>Made with <span className='heart-icon'><PiHeartFill /></span> in London</div>
        </Wrapper>
    )
}

export default Footer;


const Wrapper = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 3rem 0;

    .social-icon-container {
        display: flex;
        gap: 1rem;
    }

    .social-icon {
        font-size: 2rem;
    }

    .links-container {
        display: flex;
        gap: 1rem;
    }

    .bottom-text {
        font-size: var(--small-text);
    }

    .heart-icon {
        color: var(--secondary)
    }

    .footer-link {
        text-decoration: none;
        color: var(--grey);
    }



`