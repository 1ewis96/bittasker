import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Wallet = () => {
  const auth = useAuth(); // Example usage of authentication if needed

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 text-center bg-dark text-white">
              <Card.Body>
                <h1>Wallet Page</h1>
                <p>This is the wallet page. Integrate your wallet component here.</p>
                {/* Add your wallet component here */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Wallet;
