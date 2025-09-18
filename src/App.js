import './App.css';
import Navbar from './components/navbar'; 
import Footer from './components/footer';
import AdminLoginPage from './pages/adminloginpage';
import AdminSignupPage from './pages/adminsignuppage';
import AdminDashboard from './pages/admindashboard';
import ManageDivision from './pages/ManageDivision';
import ManageSubjects from './pages/ManageSubjects';
import ManageSettings from './pages/ManageSettings';
import ManageFaculty from './pages/ManageFaculty';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  
  // Don't show navbar on login/signup pages
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <div className="flex-grow bg-gray-100 py-10 px-4">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <AdminLoginPage setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              !isAuthenticated ? (
                <AdminSignupPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          <Route 
            path="/divisions" 
            element={
              isAuthenticated ? (
                <ManageDivision />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route 
            path="/faculty" 
            element={
              isAuthenticated ? (
                <ManageFaculty />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route 
            path="/subjects" 
            element={
              isAuthenticated ? (
                <ManageSubjects />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? (
                <ManageSettings />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
