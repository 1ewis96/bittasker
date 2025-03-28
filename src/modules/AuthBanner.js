import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";

const AuthBanner = ({ onSignIn, onCreateAccount }) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Container className="mt-3">
      <Alert
        variant="warning"
        dismissible
        onClose={() => setShow(false)}
        className="mt-3"
      >
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-start">
            You're not signed in. For a better experience, please create an account or sign in.
          </span>
          <div className="d-flex gap-2">
            <Button variant="outline-dark" onClick={onSignIn}>
              Sign In
            </Button>
            <Button variant="dark" onClick={onCreateAccount}>
              Create Account
            </Button>
          </div>
        </div>
      </Alert>
    </Container>
  );
};

export default AuthBanner;
