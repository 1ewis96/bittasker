import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

import Home from './pages/Home';
import Navigation from './pages/Navigation';
import Footer from './pages/Footer';
import Settings from './pages/Settings';

function App() {
	
const auth = useAuth();
	
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }
	
   return (
    <Router>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
  
  
}

export default App;
