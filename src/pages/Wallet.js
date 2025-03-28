import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Dropdown,
  ButtonGroup,
  InputGroup,
  FormControl,
  Collapse,
} from "react-bootstrap";
import { formatUnits } from "ethers";
import { FiCopy, FiChevronDown, FiChevronUp } from "react-icons/fi";
import SubNav from "../pages/Subnav";

import Navigation from "./Navigation";
import Footer from "./Footer";
import MetaMaskBanner from "../modules/MetaMaskBanner";
import AuthBanner from "../modules/AuthBanner";

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [expandedTx, setExpandedTx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const detectWallet = async () => {
    if (window?.ethereum?.selectedAddress) {
      setWalletAddress(window.ethereum.selectedAddress);
    } else {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (err) {
        console.error("Error fetching wallet:", err);
      }
    }
  };

  const fetchTransactions = async (pageNumber = 1, address = walletAddress) => {
    if (!address) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.bittasker.xyz/tx/history?wallet=${address}&page=${pageNumber}`
      );
      const data = await response.json();

      if (data.transactions && data.transactions.length > 0) {
        const sorted = sortOrder === "asc"
          ? [...data.transactions].sort((a, b) => a.timeStamp - b.timeStamp)
          : [...data.transactions].sort((a, b) => b.timeStamp - a.timeStamp);

        setTransactions(sorted);
        setPage(pageNumber);
      } else {
        setError("No transactions found.");
        setTransactions([]);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Error fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  const filterTx = () => {
    let txs = [...transactions];

    // Filter by type
    if (filterType !== "all") {
      txs = txs.filter((tx) =>
        filterType === "sent"
          ? tx.from.toLowerCase() === walletAddress?.toLowerCase()
          : tx.to.toLowerCase() === walletAddress?.toLowerCase()
      );
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      txs = txs.filter((tx) =>
        tx.hash.toLowerCase().includes(term) ||
        tx.from.toLowerCase().includes(term) ||
        tx.to.toLowerCase().includes(term) ||
        new Date(tx.timeStamp * 1000).toLocaleDateString().includes(term)
      );
    }

    setFilteredTransactions(txs);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleExpanded = (hash) => {
    setExpandedTx(expandedTx === hash ? null : hash);
  };

  useEffect(() => {
    detectWallet();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      fetchTransactions();
    }
  }, [walletAddress, sortOrder]);

  useEffect(() => {
    filterTx();
  }, [transactions, filterType, searchTerm]);

  return (
    <>
      <Navigation />
      <SubNav />
      <MetaMaskBanner />
      <AuthBanner />
      <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
  <div className="flex-grow-1">
    <h3 className="mb-0">Transaction History</h3>
  </div>
  <div style={{ width: "300px" }}>
    <InputGroup>
      <FormControl
        placeholder="Search hash, address, date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
  </div>
</div>


        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="dark" />
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && filteredTransactions.length > 0 && (
          <>
            <Row>
              {filteredTransactions.map((tx) => {
                const isSent = tx.from.toLowerCase() === walletAddress?.toLowerCase();
                const amount = formatUnits(tx.value, Number(tx.tokenDecimal || 18));
                const isExpanded = expandedTx === tx.hash;

                return (
                  <Col key={tx.hash} md={12} className="mb-3">
                    <Card className="shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                        <Card.Title className={`fw-bold ${isSent ? "text-danger" : "text-success"}`}>
  {isSent ? "Sent" : "Received"} {amount}{" "}
  <img
  src="https://s3.bittasker.xyz/static/task-icon.png"
  alt="TASK"
  height="20"
  draggable="false"
  style={{
    verticalAlign: "middle",
    marginLeft: "6px",
    marginTop: "-4px",
    userSelect: "none",
    pointerEvents: "none"
  }}
/>

</Card.Title>

                          <Button variant="link" onClick={() => toggleExpanded(tx.hash)}>
                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                          </Button>
                        </div>
                        <Card.Text className="mb-2">
                          <strong>From:</strong> {tx.from}{" "}
                          <FiCopy onClick={() => handleCopy(tx.from)} role="button" />
                          <br />
                          <strong>To:</strong> {tx.to}{" "}
                          <FiCopy onClick={() => handleCopy(tx.to)} role="button" />
                          <br />
                          <strong>Tx Hash:</strong>{" "}
                          <a
                            href={`https://polygonscan.com/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tx.hash.slice(0, 10)}...
                          </a>
                          <br />
                          <strong>Date:</strong>{" "}
                          {new Date(tx.timeStamp * 1000).toLocaleString()}
                        </Card.Text>

                        <Collapse in={isExpanded}>
                          <div>
                            <pre className="bg-dark p-2 rounded small">
                              {JSON.stringify(tx, null, 2)}
                            </pre>
                          </div>
                        </Collapse>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Button
                variant="outline-dark"
                disabled={page <= 1}
                onClick={() => fetchTransactions(page - 1)}
              >
                Previous
              </Button>
              <span className="text-muted">Page {page}</span>
              <Button
                variant="dark"
                onClick={() => fetchTransactions(page + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Wallet;
