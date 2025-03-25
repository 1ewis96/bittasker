import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaLock } from "react-icons/fa";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useStakingVault } from "../../hooks/useStakingVault";

const Vault = () => {
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const maxDurationDays = 365;
  const lockDuration = Math.floor((percentage / 100) * maxDurationDays);
  const [estimatedEarnings, setEstimatedEarnings] = useState("0.00");

  const { account, stakeTokens, loading, previewReward } = useStakingVault();

  const fetchEstimate = async (parsedAmount) => {
    try {
      const reward = await previewReward(parsedAmount, lockDuration);
      setEstimatedEarnings(reward);
    } catch (err) {
      console.error("❌ Failed to fetch estimate:", err);
      setEstimatedEarnings("0.00");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const parsed = parseFloat(amount);
      if (!isNaN(parsed) && parsed > 0 && lockDuration > 0) {
        console.log("🔁 Triggering reward estimate...");
        fetchEstimate(parsed);
      } else {
        setEstimatedEarnings("0.00");
      }
    }, 500); // debounce delay

    return () => clearTimeout(timeout);
  }, [amount, lockDuration, previewReward]);

  const handleStake = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || lockDuration <= 0) {
      alert("❌ Please enter a valid amount and lock duration.");
      return;
    }

    try {
      console.log("🚀 Staking tokens...");
      await stakeTokens(parsedAmount, lockDuration);
      alert("✅ Tokens successfully staked!");
    } catch (error) {
      console.error("❌ Error staking tokens:", error);
      alert("❌ Error staking tokens. See console for details.");
    }
  };

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

                <p className="mt-2">
                  Lock Duration: <strong>{lockDuration} days</strong>
                </p>

                <motion.div
                  className="bg-secondary rounded p-3 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>📈 Estimated Earnings:</p>
                  <h4>{estimatedEarnings} TOKEN</h4>
                </motion.div>

                <Button
                  className="mt-4 px-5 py-2 fw-bold rounded-pill"
                  variant="warning"
                  onClick={handleStake}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" className="me-2" />
                  ) : (
                    <FaLock className="me-2" />
                  )}
                  {loading ? "Locking..." : "Lock Tokens"}
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
