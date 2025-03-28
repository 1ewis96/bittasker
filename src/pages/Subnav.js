import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./SubNav.css"; // Make sure this matches your project structure

const SubNav = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", href: "/wallet" },
    { label: "Transactions", href: "/wallet/transactions" },
    { label: "Staking", href: "/wallet/staking" },
    { label: "Settings", href: "/wallet/settings" },
  ];

  return (
    <div className="subnav-container">
      <div className="container px-3 py-2">
        <Nav
          variant="pills"
          className="flex-nowrap overflow-auto"
        >
          {links.map((link) => (
            <Nav.Item key={link.href}>
              <Nav.Link
                href={link.href}
                active={location.pathname === link.href}
              >
                {link.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default SubNav;
