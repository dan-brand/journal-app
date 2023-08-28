import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


// Create Context
const AppContext = createContext(); 

function AppProvider({ children }) {

    // User in Local Storage
    const userFromLocalStorage = localStorage.getItem('user');
    
    // State
    const [journals, setJournals] = useState([]);
    const [journal, setJournal] = useState({});
    const [user, setUser] = useState(userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);

    // Utility Functions
    const addUserToLocalStorage = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
    }

    const logoutUser = () => {
        setUser(null)
        removeUserFromLocalStorage();
    }

    // API Call Functions
    const createJournal = async(jTitle, jType, jEmoji, jEntry) => {
        try {
            const response = await axios.post('/api/v1/journals', {title: jTitle, type: jType, emoji: jEmoji, entry: jEntry}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const { newJournal } = response.data;
            setJournal(newJournal);
            toast.success('Journal Created');
        } catch(error) {
            toast.error(error.response.data.msg);
        }
    }

    const getJournalsData = async() => {
        try {
            const response = await axios.get('/api/v1/journals', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const { allJournals } = response.data;
            setJournals(allJournals);
        } catch(error) {
            toast.error(error.response.data.msg);
        }
    }

    const getJournalData = async(jId) => {
        try {
            const response = await axios.get(`/api/v1/journals/${jId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const { journal } = response.data;
            setJournal(journal);
        } catch(error) {
            toast.error(error.response.data.msg);
        }
    }

    const updateJournal = async(newTitle, newEntry, newType, newEmoji, jId) => { 
        try {
            const updatedJournal = {
                title: newTitle,
                entry: newEntry,
                type: newType,
                emoji: newEmoji
            }
            const response = await axios.patch(`/api/v1/journals/${jId}`, updatedJournal, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setJournal({...journal, title: newTitle, entry: newEntry, type: newType, emoji: newEmoji })
            toast.success('Journal Updated');
        } catch(error) {
            toast.error(error.response.data.msg);
        }
    }

    const deleteJournal = async(jId) => {
        try {
            await axios.delete(`/api/v1/journals/${jId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            toast.success('Journal Deleted');
        } catch(error) {
            toast.error(error.response.data.msg);
        }
    }

    const registerUser = async(uE, uP) => {
        try {
            const user = {
                email: uE,
                password: uP
            }
            const response = await axios.post('/api/v1/user/register', user);
            console.log(response.data);
            setUser(response.data);
            addUserToLocalStorage(response.data);
            toast.success('Welcome Aboard')
        } catch(error) {
            toast.error(error.response.data.msg);
        }
    }

    const loginUser = async(uE, uP) => {
        const loadingToastId = toast.loading('Loading...'); // Display loading toast
        try {
            const user = {
                email: uE,
                password: uP
            }
            const response = await axios.post('/api/v1/user/login', user);
            console.log(response.data);
            setUser(response.data);
            addUserToLocalStorage(response.data);
            toast.update(loadingToastId, { render: 'Welcome back', type: 'success', isLoading: false, autoClose: 3000 });
            // toast.success('Welcome Back')
        } catch(error) {
            // toast.error(error.response.data.msg);
            toast.update(loadingToastId, { render: error.response.data.msg, type: 'error', isLoading: false, autoClose: 3000 })
        }
    }
    
    return (
        <AppContext.Provider value={{ journals, getJournalsData, journal, getJournalData, updateJournal, deleteJournal, user, registerUser, loginUser, logoutUser, createJournal }}>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
} 

export { AppProvider, useAppContext };