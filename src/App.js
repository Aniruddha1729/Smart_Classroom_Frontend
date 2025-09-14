import './App.css';
import Navbar from './components/navbar'; 
import Footer from './components/footer';
import LoginPage from './components/LoginPage';
import SideImage from './components/sideimage';

function App() {
  return (
   <>
   <Navbar />
   <div className="main-content">
     <SideImage />
      <LoginPage />
   </div>
   <Footer />
   </>
  );
}

export default App;
