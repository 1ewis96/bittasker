import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, ProgressBar, Image, Badge, Modal } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { ethers } from "ethers";

const PRESALE_ADDRESS = "0x51bDb0120841233Aad0f34c9d96ed09CBD763732";
const PRESALE_ABI = [
  "function estimateTokensReceived(uint256 ethAmount) external view returns (uint256)",
  "function buyTokens() external payable",
  "function getCurrentStage() external view returns (uint256, uint256, uint256)"
];

const Purchase = () => {
  const auth = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customAmount, setCustomAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [tokensReceived, setTokensReceived] = useState(0);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [presaleContract, setPresaleContract] = useState({ connected: null, readonly: null });

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        const s = await newProvider.getSigner();

        const connected = new ethers.Contract(PRESALE_ADDRESS, PRESALE_ABI, s);
        const readonly = new ethers.Contract(PRESALE_ADDRESS, PRESALE_ABI, newProvider);

        setProvider(newProvider);
        setSigner(s);
        setPresaleContract({ connected, readonly });
      }
    }
    init();
  }, []);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setCustomAmount(0);
    console.log("Package selected:", pkg);
  };

  const handlePurchase = async () => {
    try {
      if (!signer || !presaleContract.connected || !presaleContract.readonly) {
        alert("Please connect MetaMask first.");
        return;
      }

      const usdValue = selectedPackage ? selectedPackage.price : parseFloat(customAmount);
      console.log("USD Value to ETH:", usdValue);

      const ethPerDollar = 1 / 3500;
      const ethToSend = usdValue * ethPerDollar;
      console.log("Calculated ETH to send:", ethToSend);

      const ethAmount = ethers.parseEther(Number(ethToSend).toFixed(6));
      console.log("ETH amount (parsed):", ethAmount.toString());

      if (ethAmount <= 0n) {
        alert("ETH amount must be greater than 0.");
        return;
      }

      let estimated;
      try {
        console.log("Attempting to estimate tokens for ETH:", ethAmount.toString());
        estimated = await presaleContract.readonly.estimateTokensReceived(ethAmount);
      } catch (err) {
        console.error("Estimate call failed:", err);
        alert("Could not estimate tokens. Try a slightly higher ETH amount.");
        return;
      }

      console.log("Estimated tokens:", estimated.toString());
      setTokensReceived(ethers.formatUnits(estimated, 18));

      console.log("Attempting to buy tokens with ETH amount:", ethAmount.toString());
      const tx = await presaleContract.connected.buyTokens({ value: ethAmount, gasLimit: 500000 });  // Increase gas limit

      await tx.wait();

      console.log("Transaction confirmed:", tx);
      setShowModal(true);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Purchase failed: " + error.message);
    }
  };

  const packages = [
    { name: "Bronze", price: 50, tokens: 5000, badge: "Popular" },
    { name: "Silver", price: 250, tokens: 25000, badge: "Best Value" },
    { name: "Gold", price: 1000, tokens: 100000, badge: "Whale Tier" },
  ];

  const presaleProgress = 65;
  const currentStage = "Stage 2";
  const stagePrice = "$0.01 per TASK";
  const totalRaised = "$195,000";
  const taskSold = "19,500,000 / 30,000,000";

  return (
    <div>
      <Navigation />
      <Container className="mt-4 mb-5">
        <Row className="justify-content-center text-center">
          <Col md={12}>
            <Image src="https://s3.bittasker.xyz/static/task-icon.png" width={80} className="mb-3" />
            <h2 className="text-white">Buy TASK Tokens</h2>
            <p className="text-muted">Join the MetaFarmers economy and stake your claim.</p>
            <Badge bg="info" className="mb-3">{currentStage} - {stagePrice}</Badge>
            <ProgressBar now={presaleProgress} label={`${presaleProgress}% Sold`} className="mb-3" />
            <p className="text-white">
              <strong>Total Raised:</strong> {totalRaised}<br />
              <strong>TASK Sold:</strong> {taskSold}
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {packages.map((pkg, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card
                className={`text-center bg-dark text-white shadow-lg ${
                  selectedPackage?.name === pkg.name ? "border-primary border-3" : ""
                }`}
              >
                <Card.Body>
                  <Card.Title className="mb-2">
                    {pkg.name} Package {pkg.badge && <Badge bg="success" className="ms-2">{pkg.badge}</Badge>}
                  </Card.Title>
                  <Card.Img variant="top" src="https://s3.bittasker.xyz/static/task-icon.png" style={{ width: 40, marginBottom: 10 }} />
                  <Card.Text>
                    <strong>{pkg.tokens.toLocaleString()} TASK</strong>
                    <br />
                    <span className="text-muted">${pkg.price}</span>
                  </Card.Text>
                  <Button variant="outline-light" onClick={() => handlePackageSelect(pkg)}>
                    Select
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col md={6} className="mx-auto">
            <Card className="p-4 text-center bg-dark text-white shadow">
              <Card.Body>
                <Card.Title>Custom Purchase</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Enter USD amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPackage(null);
                    }}
                  />
                </Form.Group>
                <p className="mb-3">
                  <strong>You will receive:</strong> {customAmount * 100} TASK
                </p>
                <Button variant="primary" size="lg" onClick={handlePurchase}>
                  Buy with ETH
                </Button>
                <p className="text-muted small mt-3">
                  🔒 Powered by secure smart contracts – no middlemen.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 Purchase Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You’ve successfully purchased <strong>{tokensReceived}</strong> TASK!</p>
          <p>Check your wallet or staking dashboard to view your balance.</p>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};

export default Purchase;
