import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Map from './pages/Map';
import Swap from './pages/Swap';
import Settings from './pages/Settings';
import CognitoCallback from './auth/CognitoCallback';
import CognitoCallbackClear from './auth/CognitoCallbackClear';



function App() {
  return (
    <UserProvider> {/* Wrap your app with UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/map" element={<Map />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/auth/callback" element={<CognitoCallback />} />
          <Route path="/auth/callback/clear" element={<CognitoCallbackClear />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
