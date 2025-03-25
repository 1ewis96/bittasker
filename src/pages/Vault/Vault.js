import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaLock } from "react-icons/fa";
import Navigation from "../Navigation";
import Footer from "../Footer";

const Vault = () => {
  const [amount, setAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const maxDurationDays = 365; // 1 year max lock
  const estimatedAPY = 20; // example APY %
  const lockDuration = Math.floor((percentage / 100) * maxDurationDays);
  const estimatedEarnings = ((amount * estimatedAPY) / 100) * (lockDuration / 365);

  return (
    <>
      <Navigation />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="p-4 text-center bg-dark text-white shadow-lg rounded-4">
              <Card.Body>
                <h2 className="mb-4">🔐 Lock Your Tokens in the Vault</h2>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount to stake"
                  />
                </InputGroup>

                <div style={{ width: 200, margin: "0 auto" }}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#ffc107",
                      trailColor: "#444",
                    })}
                  />
                </div>

                <Form.Range
                  className="mt-4"
                  min={0}
                  max={100}
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                />
                <p className="mt-2">Lock Duration: <strong>{lockDuration} days</strong></p>

                <motion.div
                  className="bg-secondary rounded p-3 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>📈 Estimated Earnings:</p>
                  <h4>{estimatedEarnings.toFixed(2)} TOKEN</h4>
                </motion.div>

                <Button
                  className="mt-4 px-5 py-2 fw-bold rounded-pill"
                  variant="warning"
                >
                  <FaLock className="me-2" /> Lock Tokens
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Vault;