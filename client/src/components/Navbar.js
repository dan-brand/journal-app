import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { HiHome, HiLogout } from "react-icons/hi";
import styled from 'styled-components'
import logo from "../assets/images/quill-logo.svg"

function Navbar() {

    const { logoutUser, user } = useAppContext();

    return(
        <Wrapper>
            <div className="logo-container">
                <NavLink to="/"><img className="logo" src={logo} alt="logo" /></NavLink>
            </div>
            { !user ? 
              <div className="navbar-list">
                <NavLink to="login" className='btn btn-primary-inverse'>Login</NavLink>
                <NavLink to="register" className='btn btn-primary'>Register</NavLink>
              </div> :
              <div className="navbar-list">
                <NavLink to='/journals'><HiHome className="icon" /></NavLink>
                <HiLogout onClick={logoutUser} className="icon" />
              </div>
            }
        </Wrapper>
    )
}

export default Navbar

const Wrapper = styled.nav`

  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo-container {
      position: relative;
  }

  .logo {
      width: 10rem;
      height: auto;
      
  }

  /* Need to work out absolute positioning, not sure why when I do 50% it doenst work */
  .beta { 
      font-size: 1.28rem;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      background-color: #e599f7;
      color: white;
      padding: 0.3rem 0.6rem; 
      border-radius: 4px;
  }

  .navbar-list {
      display: flex;
      align-items: center;
      gap: 3rem;
  }

  .icon {
    font-size: 3rem;
    color: var(--primary);
    cursor: pointer;
  }



`