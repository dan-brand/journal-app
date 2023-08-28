import styled from 'styled-components';
import write from '../../assets/images/feature-1.svg'
import display from '../../assets/images/feature-2.svg'
import read from '../../assets/images/feature-3.svg'
import { useAppContext } from '../../context/appContext';
import { Link } from 'react-router-dom';

// import { HiPencil } from "react-icons/hi";


function Landing() {
    
    const { user } = useAppContext();
    
    return(
        <Wrapper>
            <section className="hero-section">
                {/* <PencilIcon /> */}
                <h1 className="hero-heading"><span className='highlight highlight-secondary'>Mindful living</span> for the<br/>digital world 📱</h1>
                <p className="hero-paragraph">The ultimate bullet journal app to document, reflect, and embrace your personal journey</p>
                {
                    user ? 
                    <div className="btn-container">
                        <Link to="journals" className='btn btn-primary'>My Journals</Link>
                    </div> :
                    <div className="btn-container">
                        <Link to="register" className='btn btn-primary'>Get Started</Link>
                        <a href="#feature-section" className='btn btn-primary-inverse'>Learn More</a>
                    </div> 
                }
            </section>

            <section id="feature-section" className="feature-section">
                <h2 className="main-feature-heading">Finally, a <span className='highlight highlight-tertiary'>simple and easy</span> to use journal app</h2>
                <div className="feature-grid-container">
                    <div className="feature-text-container">
                        <h3 className="feature-heading">Write all your journals in a few clicks</h3>
                        <p>I'm baby bushwick health goth plaid try-hard, JOMO schlitz taiyaki austin whatever offal raw denim four loko fit.</p>
                    </div>
                    <img className="feature-img" src={write} alt="feature image" />
                </div>
                <div className="feature-grid-container">
                <img className="feature-img" src={display} alt="feature image" />
                    <div className="feature-text-container">
                        <h3 className="feature-heading">Beaitufilly displayed and neatly organised</h3>
                        <p>I'm baby bushwick health goth plaid try-hard, JOMO schlitz taiyaki austin whatever offal raw denim four loko fit.</p>
                    </div>
                </div>
                <div className="feature-grid-container">
                    <div className="feature-text-container">
                        <h3 className="feature-heading">Create and reflect from whereever you are</h3>
                        <p>I'm baby bushwick health goth plaid try-hard, JOMO schlitz taiyaki austin whatever offal raw denim four loko fit.</p>
                    </div>
                    <img className="feature-img" src={read} alt="feature image" />
                </div>
            </section>
        
            <section className="cta-section">
                <div className="cta-box">
                    <h2 className="cta-heading">Get Started Now</h2>
                    <a className="btn btn-secondary" href="register.html">Get Started</a>
                </div>
            </section>
        </Wrapper>
    )
}

export default Landing;

const Wrapper = styled.main`

.hero-section {
    text-align: center;
    height: calc(100vh - var(--nav-height));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.hero-heading {
    margin-bottom: 2rem;
}

.hero-paragraph {
    margin-bottom: 3rem;
}

.btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

}

.main-feature-heading {
    text-align: center;
}

.feature-text-container {
    align-self: center;
}

.feature-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 60rem;
}

.feature-heading {
    color: var(--grey-dark)
}

.feature-img {
    justify-self: center;
    align-self: center;
    max-width: 35rem;
}

.cta-section {
    margin: 5rem 0;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cta-box {
    width: 80%;
    height: 70%;
    color: white;
    background-color: #1c7ed6;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cta-heading {
    margin-bottom: 3rem;
}

/* SMALL LAPTOPS (<1250px) */

@media (max-width: 78rem ) {
    .cta-box {
        width: 90%;
    }

}

/* LANSCAPE TABLETS (<1000px) */

@media (max-width: 63rem ) {
    
    .feature-heading {
        font-size: 3.052rem;
    }
    
    .feature-img {
        max-width: 30rem;
    }

    .feature-grid-container {
        height: 40rem;
    }

}

/* PORTAIT TABLETS (<750px) */

@media (max-width: 47rem ) {
    
    h1 {
        font-size: 4.768rem;
    }

    h2 {
        font-size: 3.815rem;
    }
    
    p {
        font-size: 1.563rem;
    }

    .cta-box {
        height: 50%;
    }


}

/* PHONE (<600px) */

@media (max-width: 38rem ) {
    
    .hero-section {
        height: 70vh;
    }

    .feature-grid-container {
        grid-template-columns: 1fr;
    }
    
    .cta-box {
        width: 100%;
    }

    .cta-heading {
        font-size: 3.052rem;
    }


}


`



