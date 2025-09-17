import './App.css';
import Navbar from './components/navbar'; 
import Footer from './components/footer';
import AdminLoginPage from './pages/adminloginpage';
import AdminDashboard from './pages/admindashboard';
import Classroom from './pages/classroom';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar />

      <div className="flex-grow min-h-screen bg-gray-100 py-10 px-4">
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
            path="/classroom" 
            element={<Classroom />} 
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
    </Router>
  );
}
export default App;
