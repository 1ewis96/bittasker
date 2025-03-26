/* global BigInt */
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (timestamp) => {
  const d = new Date(Number(timestamp) * 1000);
  return d.toLocaleDateString();
};

const getTimeRemaining = (endTimestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = endTimestamp - now;

  if (diff <= 0) return "Unlocked";

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
};

const Vault = () => {
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState("0.00");
  const [estimatedApy, setEstimatedApy] = useState(0);
  const [unstakeLoadingIndex, setUnstakeLoadingIndex] = useState(null);

  const {
    account,
    stakeTokens,
    unstake,
    fetchStakes,
    stakes,
    previewReward,
    getApyForLockDays,
    minLockDays,
    maxLockDays,
    loading,
  } = useStakingVault();

  const lockDuration = Math.floor(
    minLockDays + (percentage / 100) * (maxLockDays - minLockDays)
  );
  

  useEffect(() => {
    if (account) fetchStakes();
  }, [account, fetchStakes]);

  useEffect(() => {
    if (percentage < 0) setPercentage(0);
    if (percentage > 100) setPercentage(100);
  }, [percentage]);

  
  const fetchEstimate = async (parsedAmount) => {
    try {
      const reward = await previewReward(parsedAmount, lockDuration);
      setEstimatedEarnings(reward);
    } catch (err) {
      console.error("❌ Failed to fetch estimate:", err);
      setEstimatedEarnings("0.00");
    }
  };

  const fetchApy = async (days) => {
    const apy = await getApyForLockDays(days);
    setEstimatedApy(apy);
  };

  useEffect(() => {
    const parsed = parseFloat(amount);
    const valid = !isNaN(parsed) && parsed > 0 && lockDuration >= minLockDays;

    const timeout = setTimeout(() => {
      if (valid) {
        fetchEstimate(parsed);
        fetchApy(lockDuration);
      } else {
        setEstimatedEarnings("0.00");
        setEstimatedApy(0);
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
      toast.error(`❌ Enter amount & lock duration between ${minLockDays}–${maxLockDays} days.`);
      return;
    }

    try {
      await stakeTokens(parsedAmount, lockDuration);
      toast.success("✅ Tokens staked!");
      await fetchStakes();
    } catch (error) {
      console.error("❌ Error staking:", error);
      toast.error("❌ Stake failed. See console for details.");
    }
  };

  const handleUnstake = async (index) => {
    const stake = stakes[index];
    if (stake.withdrawn) return;

    if (!window.confirm("Are you sure you want to unstake?")) return;

    try {
      setUnstakeLoadingIndex(index);
      await unstake(index);
      toast.success("✅ Unstaked successfully!");
      await fetchStakes();
    } catch (error) {
      console.error("❌ Failed to unstake:", error);
      toast.error("❌ Unstake failed.");
    } finally {
      setUnstakeLoadingIndex(null);
    }
  };

  const activeStakes = stakes.filter((s) => !s.withdrawn);
  const withdrawnStakes = stakes.filter((s) => s.withdrawn);

  return (
    <>
      <Navigation />
      <Container className="mt-5">
        <Row>
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
                    text={`${estimatedApy}% APY`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#ffc107",
                      trailColor: "#444",
                    })}
                  />
                </div>

                <Form.Range
                  className="mt-4"
                  min={minLockDays}
                  max={maxLockDays}
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                />

                <p className="mt-2">
                  Lock Duration: <strong>{lockDuration} days</strong>{" "}
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

          <Col md={6}>
            <Card className="p-4 bg-light shadow rounded-4 mb-4 bg-dark text-white">
              <Card.Body>
                <h4 className="mb-3">📊 Active Stakes</h4>
                {activeStakes.length === 0 ? (
                  <p>No active stakes yet.</p>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Amount</th>
                        <th>Unlocks In</th>
                        <th>APY</th>
                        <th>Reward</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeStakes.map((stake, i) => {
                        const { amount, startTime, lockDuration, apy, withdrawn } = stake;
                        const start = BigInt(startTime);
                        const unlockTime = start + BigInt(lockDuration) * BigInt(86400);
                        const now = BigInt(Math.floor(Date.now() / 1000));
                        const isUnlocked = now >= unlockTime;

                        const parsedAmount = parseFloat(ethers.formatUnits(amount, 18));
                        const reward = parsedAmount * (Number(apy) / 100) * (Number(lockDuration) / 365);
                        const countdown = getTimeRemaining(Number(unlockTime));

                        return (
                          <tr key={i}>
                            <td>{parsedAmount.toFixed(2)} TOKEN</td>
                            <td>{countdown}</td>
                            <td>{Number(apy)}%</td>
                            <td>{reward.toFixed(4)}</td>
                            <td>
                              <Button
                                size="sm"
                                variant={isUnlocked ? "success" : "danger"}
                                onClick={() => handleUnstake(i)}
                                disabled={unstakeLoadingIndex === i}
                              >
                                {unstakeLoadingIndex === i ? (
                                  <Spinner animation="border" size="sm" className="me-2" />
                                ) : null}
                                {isUnlocked ? "Unstake" : "Early Unstake"}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}

                {withdrawnStakes.length > 0 && (
                  <>
                    <hr />
                    <h5 className="mt-4">📜 Unstaked History</h5>
                    <Table size="sm" bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Amount</th>
                          <th>Start</th>
                          <th>Duration</th>
                          <th>APY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawnStakes.map((stake, i) => {
                          const { amount, startTime, lockDuration, apy } = stake;
                          const parsedAmount = parseFloat(ethers.formatUnits(amount, 18));
                          return (
                            <tr key={i}>
                              <td>{parsedAmount.toFixed(2)} TOKEN</td>
                              <td>{formatDate(startTime)}</td>
                              <td>{Math.floor(Number(lockDuration) / 86400)} days</td>
                              <td>{Number(apy)}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar />
      <Footer />
    </>
  );
};

export default Vault;
