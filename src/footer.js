import React from "react";
import { Container } from "react-bootstrap"; // Ensure this is imported

const links = [
  { title: "Map", link: "https://bittasker.xyz/map" },
  { title: "Github", link: "https://github.com/" },
  { title: "Docs", link: "https://cdn.bittasker.xyz" },
  { title: "Wallet", link: "https://wallet.bittasker.xyz" },
  { title: "Swap", link: "https://swap.bittasker.xyz" }
];

const Footer = () => {
  return ( 
    <Container className="mt-4">
      <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
        {links.map((link, index) => (
          <a 
            key={index} 
            href={link.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", color: "white" }}
          >
            {link.title}
            <svg className="bi" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793L9.146 3.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </a>
        ))}
      </div> 
    </Container>
  );
};

export default Footer;
