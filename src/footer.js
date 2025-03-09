import React from "react";

const links = [
{ title: "Github", link: "https://github.com/" },
	{title: "Docs", link: "https://cdn.bittasker.xyz" },
		{title: "Wallet", link: "https://wallet.bittasker.xyz"}
		]; 
		
const Footer = () => {
  return (
  
  <Container className="mt-4">
  {links.map((link, index) => (
    <a 
      key={index} 
      href={link.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ textDecoration: 'none' }}
    >
             <a className="icon-link text-light" href="https://metafarmers.io" rel="noopener noreferrer" target="_blank">
			 {link.title}
            <svg className="bi" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793L9.146 3.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </a>
    </a>
  ))}
</Container>




    className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-dark text-white">
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
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
};

export default Footer;
