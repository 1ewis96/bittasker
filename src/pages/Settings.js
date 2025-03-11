import React from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Settings = () => {
  const auth = useAuth();

  return (
    <>
      <Navigation />
      <Container>
        {auth.isAuthenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Un-authenticated</p>
        )}
      </Container>
	  <Footer />
    </>
  );
};

export default Settings;
