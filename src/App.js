import './App.css';
import Navbar from './components/navbar'; 
import Footer from './components/footer';
import AdminLoginPage from './pages/adminloginpage';
import AdminDashboard from './pages/admindashboard';
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Navbar />

      <div className="main-content">
        {/* If logged in → show Dashboard else → show Login */}
        {!isAuthenticated ? (
          <AdminLoginPage setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <AdminDashboard />
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
