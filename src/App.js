import './App.css';
import NavBar from './components/NavBar/NavBar';
import AboutMe from './components/AboutMe/AboutMe';
import LandingName from './components/LandingName/LandingName';
import CertificationsCarousel from './components/CertificationsCarousel/CertificationsCarousel';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <LandingName />
      <CertificationsCarousel />
      <AboutMe />
      <Footer />
    </div>
  );
}

export default App;