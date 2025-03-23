import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "./Navigation";
import Footer from "./Footer";

const WhitePaper = () => {
  const auth = useAuth(); // Example usage of authentication if needed

  return (
    <>
      <Navigation />
      {/* Hero Section */}
      <section
        className="hero-section text-center text-white py-5"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1600x800')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="overlay"></div>
        <Container>
          <h1 data-aos="fade-up" className="display-4 font-weight-bold mb-3">
            MetaFarmers White Paper
          </h1>
          <p data-aos="fade-up" className="lead mb-4">
            Revolutionizing the in-game economy with TASK token integration.
          </p>
        </Container>
      </section>

      {/* White Paper Content Section */}
      <Container id="whitepaper" className="mt-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Introduction</h2>
              <p>
                <strong>BitTasker</strong> presents <strong>MetaFarmers</strong>, an immersive open-world 2D game where players can trade in-game items, stake tokens, and participate in a decentralized economy. The <strong>TASK</strong> token powers this ecosystem, offering real value and community-driven gameplay experiences.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Problem Statement</h2>
              <p>
                Traditional in-game currencies are isolated within individual games, limiting players' control over their assets and the value of their tokens. <strong>TASK</strong> solves this by integrating blockchain technology, giving players the ability to withdraw, trade, and interact with a truly decentralized economy.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Token Overview</h2>
              <ul className="list-unstyled">
                <li><strong>Name</strong>: TASK</li>
                <li><strong>Symbol</strong>: TASK</li>
                <li><strong>Blockchain</strong>: Ethereum</li>
                <li><strong>Total Supply</strong>: 1,000,000,000 TASK (Fixed)</li>
                <li><strong>Minting Cap</strong>: 1,500,000,000 TASK (Maximum)</li>
                <li><strong>Yearly Mint Cap</strong>: 50,000,000 TASK (Maximum per Year)</li>
                <li><strong>Decimals</strong>: 18</li>
              </ul>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Token Utility</h2>
              <p>
                The <strong>TASK</strong> token will serve multiple purposes within the MetaFarmers ecosystem:
              </p>
              <ul className="list-unstyled">
                <li><strong>Trading Items</strong>: Players can use TASK to trade in-game items.</li>
                <li><strong>Purchasing Content</strong>: Use TASK to buy premium content and items.</li>
                <li><strong>Staking</strong>: Stake TASK tokens to earn rewards and passive income.</li>
                <li><strong>Governance</strong>: Participate in governance decisions to shape the game's future.</li>
              </ul>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Presale & Airdrop</h2>
              <p>
                We are launching a presale and airdrop to engage the community early and reward active participants. The presale will offer discounted TASK tokens, while the airdrop will distribute 10% of the total supply to users.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Staking Mechanism</h2>
              <p>
                Players can stake their TASK tokens to earn rewards, fostering long-term engagement. Staking rewards will be based on the amount staked and the lock-up period, with higher rewards for longer durations.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Governance</h2>
              <p>
                TASK token holders will have governance rights to propose and vote on changes within the game, ensuring a community-driven approach to growth.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Roadmap</h2>
              <p><strong>Q1 2025</strong>: Game development begins, smart contract coding, and community engagement.</p>
              <p><strong>Q2 2025</strong>: Presale, airdrop, and staking mechanisms go live.</p>
              <p><strong>Q3 2025</strong>: Full game launch with token economy and governance systems.</p>
              <p><strong>Q4 2025 and Beyond</strong>: Ongoing updates, scaling, and expansion into new networks like Polygon.</p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">Conclusion</h2>
              <p>
                <strong>TASK</strong> is designed to empower players within the <strong>MetaFarmers</strong> universe, offering a decentralized economy and real financial incentives. Through careful tokenomics, staking rewards, and transparent governance, TASK aims to be the foundation of a sustainable in-game economy.
              </p>
            </section>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default WhitePaper;
