import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

function RootLayout() {

  const location = useLocation();

  return (
    <div className='container'>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      { (location.pathname !== '/login' && location.pathname !== '/register') && <Footer /> }
    </div>
    
  )
}


export default RootLayout;
