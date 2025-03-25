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
  Table,
  Badge,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaLock } from "react-icons/fa";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useStakingVault } from "../../hooks/useStakingVault";
import { ethers } from "ethers";

/* global BigInt */

const formatDate = (timestamp) => {
  const d = new Date(Number(timestamp) * 1000);
  return d.toLocaleDateString();
};

const Vault = () => {
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState("0.00");
  const [unstakeLoadingIndex, setUnstakeLoadingIndex] = useState(null);

  const {
    account,
    stakeTokens,
    unstake,
    fetchStakes,
    stakes,
    previewReward,
    minLockDays,
    maxLockDays,
    loading,
  } = useStakingVault();

  const lockDuration = Math.floor((percentage / 100) * maxLockDays);

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchStakes();
      setHasFetched(true);
    }
  }, [fetchStakes, hasFetched]);
  

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
      if (!isNaN(parsed) && parsed > 0 && lockDuration >= minLockDays) {
        console.log("🔁 Triggering reward estimate...");
        fetchEstimate(parsed);
      } else {
        setEstimatedEarnings("0.00");
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [amount, lockDuration, previewReward, minLockDays]);

  const handleStake = async () => {
    const parsedAmount = parseFloat(amount);
    if (
      isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      lockDuration < minLockDays ||
      lockDuration > maxLockDays
    ) {
      alert(
        `❌ Please enter a valid amount and lock duration between ${minLockDays} and ${maxLockDays} days.`
      );
      return;
    }

    try {
      console.log("🚀 Staking tokens...");
      await stakeTokens(parsedAmount, lockDuration);
      alert("✅ Tokens successfully staked!");
      await fetchStakes();
    } catch (error) {
      console.error("❌ Error staking tokens:", error);
      alert("❌ Error staking tokens. See console for details.");
    }
  };

  const handleUnstake = async (index) => {
    const stake = stakes[index];
    const { withdrawn } = stake;
    if (withdrawn) return;

    if (!window.confirm("Are you sure you want to unstake?")) return;

    try {
      setUnstakeLoadingIndex(index);
      console.log(`🔓 Unstaking index ${index}...`);
      await unstake(index);
      alert("✅ Unstaked successfully!");
      await fetchStakes();
    } catch (error) {
      console.error("❌ Failed to unstake:", error);
      alert("❌ Failed to unstake. See console for details.");
    } finally {
      setUnstakeLoadingIndex(null);
    }
  };

  return (
    <>
      <Navigation />
      <Container className="mt-5">
        <Row>
          {/* Vault Section */}
          <Col md={6}>
            <Card className="p-4 text-center bg-dark text-white shadow-lg rounded-4 mb-4">
              <Card.Body>
                <h2 className="mb-4">🔐 Lock Your Tokens</h2>

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
                  Lock Duration:{" "}
                  <strong>{lockDuration} days</strong>{" "}
                  <small className="text-muted">
                    (Min {minLockDays}, Max {maxLockDays})
                  </small>
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

          {/* Dashboard Section */}
          <Col md={6}>
            <Card className="p-4 bg-light shadow rounded-4 mb-4 bg-dark">
              <Card.Body>
                <h4 className="mb-3">📊 Your Stakes</h4>
                {stakes.length === 0 ? (
                  <p>No active stakes yet.</p>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Amount</th>
                        <th>Start</th>
                        <th>Unlock</th>
                        <th>Duration</th>
                        <th>APY</th>
                        <th>Reward</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakes.map((stake, i) => {
                        const {
                          amount,
                          startTime,
                          lockDuration,
                          apy,
                          withdrawn,
                        } = stake;

                        const start = BigInt(startTime);
                        const unlockTime =
                          start + BigInt(lockDuration) * BigInt(86400);
                        const now = BigInt(Math.floor(Date.now() / 1000));
                        const isUnlocked = now >= unlockTime;
                        const parsedAmount = parseFloat(
                          ethers.formatUnits(amount, 18)
                        );
                        const reward =
                          parsedAmount *
                          (Number(apy) / 100) *
                          (Number(lockDuration) / 365);

                        return (
                          <tr key={i}>
                            <td>
                              {parsedAmount.toFixed(2)}{" "}
                              <span className="text-muted">TOKEN</span>
                            </td>
                            <td>{formatDate(start)}</td>
                            <td>{formatDate(unlockTime)}</td>
                            <td>{lockDuration} days</td>
                            <td>{Number(apy)}%</td>
                            <td>{reward.toFixed(4)}</td>
                            <td>
                              {withdrawn ? (
                                <Badge bg="secondary">Withdrawn</Badge>
                              ) : (
                                <Button
                                  size="sm"
                                  variant={isUnlocked ? "success" : "danger"}
                                  onClick={() => handleUnstake(i)}
                                  disabled={unstakeLoadingIndex === i}
                                >
                                  {unstakeLoadingIndex === i ? (
                                    <Spinner
                                      animation="border"
                                      size="sm"
                                      className="me-2"
                                    />
                                  ) : null}
                                  {isUnlocked ? "Unstake" : "Early Unstake"}
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
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

export default Vault;
