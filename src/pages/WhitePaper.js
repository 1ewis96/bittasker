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
                <h2>Introduction</h2>
                <p>
                  <strong>BitTasker</strong> presents <strong>MetaFarmers</strong>, an exciting and immersive open-world 2D game where players can engage in a dynamic economy powered by blockchain technology. The in-game currency, <strong>TASK</strong>, will allow players to trade items, access premium content, stake for rewards, and participate in an evolving in-game ecosystem. By integrating cryptocurrency into the gameplay, <strong>MetaFarmers</strong> offers players the opportunity to not only enjoy a rich gaming experience but also to earn, trade, and interact in a decentralized environment.
                </p>

                <h2>Problem Statement</h2>
                <p>
                  Traditional in-game currencies are often locked within a specific platform or game ecosystem, limiting the economic opportunities for players. Players have no control over the value of these currencies, nor can they trade or transfer them outside the game. Additionally, developers often face challenges in managing and growing in-game economies due to centralization and lack of transparency.
                </p>
                <p>
                  <strong>TASK</strong> solves this problem by offering a decentralized, fungible, and valuable in-game currency that is backed by blockchain technology. Players can deposit, withdraw, and trade the currency, giving them the ability to monetize their in-game activities and participate in a vibrant economy.
                </p>

                <h2>Token Overview</h2>
                <ul>
                  <li><strong>Name</strong>: TASK</li>
                  <li><strong>Symbol</strong>: TASK</li>
                  <li><strong>Blockchain</strong>: Ethereum (or Polygon)</li>
                  <li><strong>Total Supply</strong>: 1,000,000,000 TASK (Initial Supply – Fixed)</li>
                  <li><strong>Minting Cap</strong>: 1,500,000,000 TASK (Maximum Supply)</li>
                  <li><strong>Yearly Mint Cap</strong>: 50,000,000 TASK (Maximum Mintable Per Year After Reaching Cap)</li>
                  <li><strong>Decimals</strong>: 18</li>
                </ul>

                <h2>Token Utility</h2>
                <p>
                  The <strong>TASK</strong> token will serve as the primary medium of exchange within <strong>MetaFarmers</strong>. It will be used for:
                </p>
                <ul>
                  <li><strong>Trading Items</strong>: Players can use TASK to trade in-game items (e.g., skins, tools, farm assets).</li>
                  <li><strong>Purchasing Content</strong>: Players can purchase premium content such as special items, avatars, and other in-game assets from the in-game shop.</li>
                  <li><strong>Staking</strong>: Players can stake their TASK tokens to earn rewards in the same token, promoting long-term engagement and earning potential.</li>
                  <li><strong>Governance</strong>: Token holders will have governance rights to propose and vote on future changes to the game’s economy, tokenomics, and feature updates.</li>
                </ul>

                <h2>Tokenomics</h2>
                <p>
                  <strong>Total Supply</strong>: 1,000,000,000 TASK (Initial Supply – Fixed)
                </p>
                <h3>Minting Cap</h3>
                <p>
                  The total supply of <strong>TASK</strong> tokens will be capped at <strong>1,500,000,000</strong> tokens. This means that the maximum number of tokens that can ever be in circulation will not exceed this cap. The development team, led by <strong>BitTasker</strong>, will have the ability to mint new tokens <strong>only</strong> in specific situations, such as for staking rewards, future in-game content expansions, or system updates. However, minting can only occur until the maximum supply of 1,500,000,000 TASK tokens is reached.
                </p>

                <h3>Yearly Mint Cap</h3>
                <p>
                  After the total supply reaches 1,500,000,000 TASK, the development team can mint up to a maximum of <strong>50,000,000 TASK tokens per year</strong>. This yearly mint cap allows flexibility for managing staking rewards, content growth, and economic adjustments, while preventing excessive inflation and ensuring that the economy remains balanced and controlled.
                </p>
                <p>
                  Any tokens minted beyond the yearly cap will require community approval through governance mechanisms, ensuring full transparency.
                </p>

                <h2>Presale & Airdrop</h2>
                <p>
                  <strong>Presale</strong>: The presale will provide early supporters with a chance to purchase <strong>TASK</strong> tokens at a discounted rate. The presale will be conducted in multiple stages, with early investors receiving discounts.
                </p>
                <p>
                  <strong>Airdrop</strong>: 10% of the total supply will be distributed via an airdrop to the community. The airdrop will be allocated based on community participation, engagement, and contributions.
                </p>

                <h2>Staking Mechanism</h2>
                <p>
                  Staking plays a crucial role in maintaining the token’s ecosystem and incentivizing long-term engagement from players. The staking mechanism will allow players to:
                </p>
                <ul>
                  <li><strong>Lock up tokens</strong> for a specific period, earning rewards in the form of more TASK tokens.</li>
                  <li><strong>Earn periodic rewards</strong> based on the amount staked and the length of time the tokens are locked up.</li>
                  <li><strong>Higher rewards</strong> will be given for longer lockup periods, encouraging players to commit their tokens to the game economy.</li>
                </ul>
                <p>
                  The annual percentage yield (APY) for staking will initially be set at 5-10%, with potential for adjustment based on the game’s economy and staking participation.
                </p>

                <h2>Governance</h2>
                <p>
                  The <strong>TASK</strong> token will include governance features to give players a voice in the future direction of <strong>MetaFarmers</strong>. Token holders will be able to:
                </p>
                <ul>
                  <li><strong>Vote on in-game economic changes</strong>, including adjustments to tokenomics, rewards, and other gameplay-related features.</li>
                  <li><strong>Propose new ideas</strong> for the game and have them voted on by the community.</li>
                  <li><strong>Make decisions on the allocation of funds</strong>, such as how to distribute rewards or marketing budgets.</li>
                </ul>

                <h2>Roadmap</h2>
                <p>
                  <strong>Q1 2025</strong>: Concept and game design finalized. Tokenomics and game economy strategy outlined. Development of game assets and smart contract coding begins.
                </p>
                <p>
                  <strong>Q2 2025</strong>: Pre-launch marketing campaign and community engagement. Presale and airdrop launch. Launch staking and reward mechanisms.
                </p>
                <p>
                  <strong>Q3 2025</strong>: Full game launch with integrated token economy. Governance system live, with community voting on in-game changes. Continued development and release of new in-game items and features.
                </p>
                <p>
                  <strong>Q4 2025 and Beyond</strong>: Regular game updates with new content. Scaling up staking rewards and player engagement. Expansion into new blockchain networks, if applicable (e.g., Polygon).
                </p>

                <h2>Conclusion</h2>
                <p>
                  <strong>TASK</strong> is designed to be a sustainable and engaging in-game currency that empowers players to participate in a decentralized economy within <strong>MetaFarmers</strong>. Through its deflationary mechanics, controlled minting cap, yearly mint cap, staking rewards, and transparent governance system, it provides players with real value in a dynamic, blockchain-driven game environment.
                </p>

                <Footer />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhitePaper;
