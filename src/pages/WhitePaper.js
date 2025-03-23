import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "./Navigation";
import Footer from "./Footer";

const WhitePaper = () => {
  const auth = useAuth(); // Example usage of authentication if needed

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 text-center bg-dark text-white">
              <Card.Body>
                <h1>White Paper</h1>
                <p>This is the White Paper. Integrate your White Paper component here.</p>
                {/* Add your map component here */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default WhitePaper;
