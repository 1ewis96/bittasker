import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

import Home from './pages/Home';
import Settings from './pages/Settings';
import CognitoCallback from './auth/CognitoCallback';
import CognitoCallbackClear from './auth/CognitoCallbackClear';

function App() {
	
   return (
    <Router>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
		<Route path="/auth/callback" component={CognitoCallback} />
		<Route path="/auth/callback/clear" component={CognitoCallbackClear} />
      </Routes>
    </Router>
  );
  
  
}

export default App;

