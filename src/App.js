import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider

import Home from './pages/Home';
import Wallet from './pages/Wallet/Wallet';
import Map from './pages/Map/Map';
import Swap from './pages/Swap';
import WhitePaper from './pages/WhitePaper';
import Settings from './pages/Settings/Settings';
import Vault from './pages/Vault/Vault';
import Purchase from './pages/Purchase/Purchase';
import CognitoCallback from './hooks/auth/CognitoCallback';
import CognitoCallbackClear from './hooks/auth/CognitoCallbackClear';

import useAuthCheck from "./hooks/auth/TokenValidation";
import Security from './pages/Settings/Security';
import Sell from './pages/Sell/Sell';
import Trade from './pages/Trade/Trade';
import Stake from './pages/Stake/Stake';
import Marketplace from './pages/Marketplace/Marketplace';
import Inventory from './pages/Inventory/Inventory';
import Clothing from './pages/Clothing/Clothing';

function App() {
  return (
    
    <UserProvider> {/* Wrap your app with UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/security" element={<Security />} />
          <Route path="/white-paper" element={<WhitePaper />} />
          <Route path="/map" element={<Map />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/auth/callback" element={<CognitoCallback />} />
          <Route path="/auth/callback/clear" element={<CognitoCallbackClear />} />

          <Route path="/sell" element={<Sell />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/clothing" element={<Clothing />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}


export default App;
