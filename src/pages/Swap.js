import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios to make API requests
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FaExchangeAlt } from 'react-icons/fa'; // Importing arrow icon for swapping

const Swap = () => {
  const auth = useAuth(); // Example usage of authentication if needed

  const [ethAmount, setEthAmount] = useState(0);
  const [taskAmount, setTaskAmount] = useState(0);
  const [ethPrice, setEthPrice] = useState(1); // Set exchange rate to 1:1 for now
  const [usdAmount, setUsdAmount] = useState(0); // USD equivalent of ETH amount
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEthActive, setIsEthActive] = useState(true); // State to toggle between ETH and $TASK

  // Fetch the current price of Ethereum using the CoinGecko API (although we set it to 1:1 for now)
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        setEthPrice(response.data.ethereum.usd); // Set price of Ethereum in USD
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
      }
    };

    fetchEthPrice();
  }, []);

  // Handle input change for Ethereum amount and calculate USD and TASK
  const handleEthChange = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0) {
      setError("Please enter a valid amount of Ethereum.");
    } else {
      setError(null);
      setEthAmount(value);
      setUsdAmount(value * ethPrice); // Update USD equivalent
      setTaskAmount(value); // Assuming 1:1 exchange for simplicity
    }
  };

  // Handle input change for TASK amount and calculate ETH
  const handleTaskChange = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0) {
      setError("Please enter a valid amount of $TASK.");
    } else {
      setError(null);
      setTaskAmount(value);
      setEthAmount(value); // Assuming 1:1 exchange for simplicity
    }
  };

  // Handle toggle between ETH and $TASK input
  const toggleInput = () => {
    setIsEthActive(!isEthActive); // Toggle between ETH and $TASK input
  };

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <Row className="justify-content-center">
          {/* Example Card Above Input */}
          <Col md={8} lg={6}>
            <Card className="p-4 mb-4 text-center bg-dark">
              <Card.Body>
                <h4 className="text-warning">ICO Launch Coming Soon!</h4>
                <p>
                  Exciting news! Our ICO is going live soon. Stay tuned for the official launch, and be ready to get your hands on $TASK. 
                  The countdown to the ICO is almost over. In the meantime, you can use this tool to get a sneak peek at the conversion rates! 
                  Keep checking back later for more updates. 🚀
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Ethereum to $TASK Converter Card */}
          <Col md={8} lg={6}>
            <Card className="p-4 text-center bg-dark text-white shadow-lg rounded">
              <Card.Body>
                <h1 className="mb-4">Ethereum to <span className="text-warning">$TASK</span> Converter</h1>
                {loading ? (
                  <p className="text-warning">Loading Ethereum price...</p>
                ) : (
                  <p className="text-success">Current ETH Price: ${ethPrice}</p>
                )}
                <Form>
                  <Form.Group controlId="ethAmount">
                    <Form.Label className="h5">Amount of Ethereum</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Ethereum amount"
                      value={ethAmount}
                      onChange={handleEthChange}
                      className="mb-3"
                      disabled={!isEthActive} // Disable ETH input if $TASK is active
                    />
                  </Form.Group>

                  <Form.Group controlId="taskAmount">
                    <Form.Label className="h5">Amount of $TASK</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter $TASK amount"
                      value={taskAmount}
                      onChange={handleTaskChange}
                      className="mb-3"
                      disabled={isEthActive} // Disable $TASK input if ETH is active
                    />
                  </Form.Group>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <p className="text-light">
                    As of now, your {ethAmount} ETH is worth approximately <strong>${usdAmount.toFixed(2)}</strong> USD.
                  </p>

                  <Button
                    variant="warning"
                    size="lg"
                    block
                    onClick={toggleInput} // Toggle input fields
                  >
                    <FaExchangeAlt /> Switch Input
                  </Button>
                </Form>

                {taskAmount !== null && (
                  <div className="mt-4">
                    <h3 className="text-success">You will receive:</h3>
                    <p className="display-4">{taskAmount.toFixed(2)} $TASK</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Swap;
