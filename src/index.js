import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "react-oidc-context";


// OIDC configuration for Cognito
const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_CdtrjKgCZ",  // Cognito hosted login page
  client_id: "1us07g33qbs5l00sdr1grcg2aj",  // Your App Client ID
  redirect_uri: "https://bittasker.xyz/auth/callback",  // The URL to redirect after login (use the root domain)
  response_type: "code",  // Authorization code flow
  scope: "email openid phone",  // Scopes to request
  post_logout_redirect_uri: "https://bittasker.xyz/auth/callback/clear",  // The URL to redirect after logout (use the root domain)
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap the app with the AuthProvider to handle authentication
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

