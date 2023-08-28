import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { useAppContext } from './context/appContext';

// Layouts
import RootLayout from './layouts/RootLayout';

// Pages
import Journals from './pages/journals/Journals';
import CreateJournal from './pages/journals/CreateJournal';
import Journal from './pages/journals/Journal';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Landing from './pages/static/Landing';

function App() {

  const { user } = useAppContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Landing />} />
        <Route path="register" element={ user ? <Navigate to='/journals'/> : <Register /> } />
        <Route path="login" element={<Login />} />
        <Route path="journals">
          <Route index element={ user ? <Journals /> : <Navigate to='/login'/>} />
            <Route path='create' element={user ? < CreateJournal/>: <Navigate to='/login'/> } />
            <Route path=":journalId" element={ user ? <Journal /> : <Navigate to='/login'/> }>
          </Route>
        </Route>
      </Route>
    )
  )

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;