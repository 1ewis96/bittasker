import React from "react";
import { Button } from "react-bootstrap"; // Ensure this is imported


const HeroSection = () => {
  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-dark text-white">
      <div className="col-md-6 p-lg-5 mx-auto my-5">
        <h1 className="display-3 fw-bold">MetaFarmers</h1>
        <h3 className="fw-normal text-light mb-3">
         Explore & Have Fun!
        </h3>
        <div className="d-flex gap-3 justify-content-center lead fw-normal">
          <a className="icon-link text-light" href="https://metafarmers.io" rel="noopener noreferrer" target="_blank">
            Learn more
            <svg className="bi" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793L9.146 3.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </a>
          <a className="icon-link text-light" href="https://metafarmers.io/client" rel="noopener noreferrer" target="_blank">
            Client
            <svg className="bi" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793L9.146 3.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </a>
        </div>
      </div>
<Button 
  variant="light" 
  size="lg" 
  href="https://metafarmers.io/client" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Sign In
</Button>
<a href="https://apps.apple.com" className="app-store-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.85 13.4c-.07-2.01 1.66-2.98 1.74-3.03-.95-1.38-2.44-1.57-2.97-1.6-1.27-.13-2.47.75-3.11.75-.64 0-1.64-.72-2.7-.7-1.38.02-2.66.8-3.36 2.02-1.46 2.53-.37 6.3 1.04 8.37.69.99 1.5 2.09 2.56 2.05 1.02-.04 1.4-.66 2.63-.66s1.56.66 2.63.64c1.09-.02 1.79-.99 2.46-1.99.77-1.13 1.09-2.23 1.11-2.29-.02 0-2.13-.82-2.2-3.26M15.47 4.37c.57-.7.95-1.65.84-2.61-.81.03-1.79.54-2.37 1.22-.52.61-.99 1.57-.86 2.49.91.07 1.83-.46 2.39-1.1"/>
      </svg>
      <span>Download on the</span>
      <strong>App Store</strong>
    </a>
<Button 
  variant="warning" 
  size="lg" 
  href="https://metafarmers.io/client" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Sign Out
</Button>

    </div>
  );
};

export default HeroSection;
