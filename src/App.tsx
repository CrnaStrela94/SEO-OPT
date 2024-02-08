import './styles.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WebScrapper from './app/webScrapper';
import UrlMetadata from './app/urlMetadata';
import SemrushMagic from './app/semrushMagic';
import DomainData from './app/domainData';
import KeywordAutosuggest from './app/keyword';
import CocktailSearch from './app/drinks';
import SignIn from './components/auth/sigin';
import Register from './components/auth/register';
import { AuthDetail } from './components/auth/authDetail';
import { auth } from '../src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Alert } from 'react-bootstrap';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(localStorage.getItem('notes') || '');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Check if user is signed in
  useEffect(() => {
    const signedInUser = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });

    return () => signedInUser();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = () => {
    localStorage.setItem('notes', notes);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isSignedIn) {
      event.preventDefault();
      setShowAlert(true);
    }
  };
  // Close sign in form when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSignIn && !((event.target as HTMLElement)?.closest('.signIn'))) {
        setShowSignIn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSignIn]);
  // Close notes when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotes && !((event.target as HTMLElement)?.closest('.notesWrapper'))) {
        setShowNotes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotes]);

  return (
    <Router>
      <div className='header'>
        <div className='greeting'>
          <h1>welcome to all in one SEO</h1>
        </div>
        <div>
          <button onClick={toggleMenu} className="hamburger">
            ☰
          </button>

          {isOpen && (
            <nav>
              <Link onClick={(event) => handleLinkClick(event)} to="/webScrapper">Web Scrapper</Link>
              <Link onClick={(event) => handleLinkClick(event)} to="/urlMetadata">URL Metadata</Link>
              <Link onClick={(event) => handleLinkClick(event)} to="/semrushMagic">Semrush Magic</Link>
              <Link onClick={(event) => handleLinkClick(event)} to="/domainData">Domain Data</Link>
              <Link onClick={(event) => handleLinkClick(event)} to="/keyword">Keyword suggestion</Link>
            </nav>
          )}
          {/* Alert that is displayed when a non-signed in user tries to access a feature */}
          {showAlert && (
            <Alert variant="danger" >
              <button onClick={() => setShowAlert(false)} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <Alert.Heading>Oh snap! You are not a member</Alert.Heading>
              <p>
                You need to sign in to access the features.
              </p>
            </Alert>
          )}
          <AuthDetail>
            {/* Routes that are accessible only to signed in users */}
            {isSignedIn && (
              <Routes>
                <Route path="/webScrapper" element={<WebScrapper />} />
                <Route path="/urlMetadata" element={<UrlMetadata />} />
                <Route path="/semrushMagic" element={<SemrushMagic />} />
                <Route path="/domainData" element={<DomainData />} />
                <Route path="/keyword" element={<KeywordAutosuggest />} />
              </Routes>

            )}
            {/* Button to toggle the notes section */}
            <button className='noteBtn' onClick={() => setShowNotes(!showNotes)}>Notes</button>
            {/* Notes section that includes a cocktail search feature */}
            {showNotes && (
              <div className='notesWrapper'>
                <h2>Are you tired? You need a break. Make a drink!</h2>
                <CocktailSearch />
                <textarea className='notes'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes here..."
                />
                <button onClick={handleSave}>Save Notes</button>
              </div>
            )}
          </AuthDetail>
        </div>
        <div>
          {/* Sign in button for non-signed in users */}
          {!isSignedIn && (
            <button className='signInBtn' onClick={() => setShowSignIn(true)}>Sign In</button>
          )}
          {/* Sign in and register forms */}
          {showSignIn && (
            <div className='signIn'>
              <SignIn />
              <Register />
            </div>
          )}
        </div>


      </div>
    </Router>
  );
}

export default App;