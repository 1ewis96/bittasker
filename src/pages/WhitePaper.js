import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // Add AOS styles

const WhitePaper = () => {
  const auth = useAuth(); // Example usage of authentication if needed

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' }); // AOS initialization for animations
  }, []);

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
            TASK Token – Revolutionizing the In-Game Economy
          </p>
        </Container>
      </section>

      {/* White Paper Content Section */}
      <Container id="whitepaper" className="mt-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">1. Introduction</h2>
              <p>
                <strong>BitTasker</strong> presents <strong>MetaFarmers</strong>, an exciting and immersive open-world 2D game where players can engage in a dynamic economy powered by blockchain technology. The in-game currency, <strong>TASK</strong>, will allow players to trade items, access premium content, stake for rewards, and participate in an evolving in-game ecosystem. By integrating cryptocurrency into the gameplay, MetaFarmers offers players the opportunity to not only enjoy a rich gaming experience but also to earn, trade, and interact in a decentralized environment.
              </p>
              <p>
                This white paper outlines the <strong>TASK</strong> tokenomics, including the token’s utility, distribution model, governance structure, and the mechanisms that ensure long-term sustainability and success.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">2. Problem Statement</h2>
              <p>
                Traditional in-game currencies are often locked within a specific platform or game ecosystem, limiting the economic opportunities for players. Players have no control over the value of these currencies, nor can they trade or transfer them outside the game. Additionally, developers often face challenges in managing and growing in-game economies due to centralization and lack of transparency.
              </p>
              <p>
                <strong>TASK</strong> solves this problem by offering a decentralized, fungible, and valuable in-game currency that is backed by blockchain technology. Players can deposit, withdraw, and trade the currency, giving them the ability to monetize their in-game activities and participate in a vibrant economy.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">3. Token Overview</h2>
              <ul className="list-unstyled">
                <li><strong>Name:</strong> TASK</li>
                <li><strong>Symbol:</strong> TASK</li>
                <li><strong>Blockchain:</strong> Ethereum (or Polygon)</li>
                <li><strong>Total Supply:</strong> 1,000,000,000 TASK (Initial Supply – Fixed)</li>
                <li><strong>Minting Cap:</strong> 1,500,000,000 TASK (Maximum Supply)</li>
                <li><strong>Yearly Mint Cap:</strong> 50,000,000 TASK (Maximum Mintable Per Year After Reaching Cap)</li>
                <li><strong>Decimals:</strong> 18</li>
              </ul>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">4. Token Utility</h2>
              <p>
                The <strong>TASK</strong> token will serve as the primary medium of exchange within MetaFarmers. It will be used for:
              </p>
              <ul className="list-unstyled">
                <li><strong>Trading Items:</strong> Players can use TASK to trade in-game items (e.g., skins, tools, farm assets).</li>
                <li><strong>Purchasing Content:</strong> Players can purchase premium content such as special items, avatars, and other in-game assets from the in-game shop.</li>
                <li><strong>Staking:</strong> Players can stake their TASK tokens to earn rewards in the same token, promoting long-term engagement and earning potential.</li>
                <li><strong>Governance:</strong> Token holders will have governance rights to propose and vote on future changes to the game’s economy, tokenomics, and feature updates.</li>
              </ul>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">5. Tokenomics</h2>
              <p><strong>Total Supply:</strong> 1,000,000,000 TASK (Initial Supply – Fixed)</p>
              <p><strong>Minting Cap:</strong> The total supply of TASK tokens will be capped at 1,500,000,000 tokens. This means that the maximum number of tokens that can ever be in circulation will not exceed this cap.</p>
              <p><strong>Minting Mechanism:</strong> The development team, led by BitTasker, will have the ability to mint new tokens only in specific situations, such as for staking rewards, future in-game content expansions, or system updates. However, minting can only occur until the maximum supply of 1,500,000,000 TASK tokens is reached.</p>
              <p><strong>Yearly Mint Cap:</strong> After the total supply reaches 1,500,000,000 TASK, the development team can mint up to a maximum of 50,000,000 TASK tokens per year. This yearly mint cap allows flexibility for managing staking rewards, content growth, and economic adjustments, while preventing excessive inflation and ensuring that the economy remains balanced and controlled.</p>
              <ul className="list-unstyled">
                <li>Staking rewards.</li>
                <li>Adding new content (e.g., new items or features) in the game.</li>
                <li>Adjusting game mechanics if needed for in-game growth or balance.</li>
              </ul>
              <p>Any tokens minted beyond the yearly cap will require community approval through governance mechanisms, ensuring full transparency.</p>

              <h5>Initial Distribution:</h5>
              <ul className="list-unstyled">
                <li>Presale: 30% of total supply (300,000,000 TASK)</li>
                <li>Airdrop: 10% of total supply (100,000,000 TASK)</li>
                <li>Staking Rewards: 20% of total supply (200,000,000 TASK)</li>
                <li>Liquidity & Market Operations: 10% of total supply (100,000,000 TASK)</li>
                <li>Team & Advisors: 20% of total supply (200,000,000 TASK)</li>
                <li>Community Rewards: 10% of total supply (100,000,000 TASK)</li>
              </ul>

              <h5>Transaction Fee & Burn Mechanism:</h5>
              <p>Every transaction will include a 0.1% fee that will be burned, reducing the circulating supply and increasing scarcity over time. This helps drive long-term value for the token.</p>

              <h5>Staking & Rewards:</h5>
              <p>Players can stake their TASK tokens and earn an annual percentage yield (APY) on their staked tokens. The staking rewards will be based on the total supply and the amount staked, with rewards distributed periodically.</p>
              <p><strong>Deflationary Model:</strong> The token's deflationary mechanics (through burns on every transaction) ensure that the supply of tokens gradually decreases over time, which is expected to drive up scarcity and, potentially, the token’s value.</p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">6. Presale & Airdrop</h2>
              <h5>Presale:</h5>
              <p>The presale will provide early supporters with a chance to purchase TASK tokens at a discounted rate. The presale will be conducted in multiple stages, with early investors receiving discounts.</p>
              <p>Funds raised during the presale will be used for development, marketing, and liquidity to ensure a smooth launch.</p>

              <h5>Airdrop:</h5>
              <p>10% of the total supply will be distributed via an airdrop to the community. The airdrop will be allocated based on community participation, engagement, and contributions.</p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">7. Staking Mechanism</h2>
              <p>Staking plays a crucial role in maintaining the token’s ecosystem and incentivizing long-term engagement from players. The staking mechanism will allow players to:</p>
              <ul className="list-unstyled">
                <li>Lock up tokens for a specific period, earning rewards in the form of more TASK tokens.</li>
                <li>Earn periodic rewards based on the amount staked and the length of time the tokens are locked up.</li>
                <li>Higher rewards will be given for longer lockup periods, encouraging players to commit their tokens to the game economy.</li>
              </ul>
              <p><strong>APY:</strong> The annual percentage yield (APY) for staking will initially be set at 5-10%, with potential for adjustment based on the game’s economy and staking participation.</p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">8. Governance</h2>
              <p>The TASK token will include governance features to give players a voice in the future direction of MetaFarmers. Token holders will be able to:</p>
              <ul className="list-unstyled">
                <li>Vote on in-game economic changes, including adjustments to tokenomics, rewards, and other gameplay-related features.</li>
                <li>Propose new ideas for the game and have them voted on by the community.</li>
                <li>Make decisions on the allocation of funds, such as how to distribute rewards or marketing budgets.</li>
              </ul>
              <p><strong>Voting Power:</strong> 1 TASK = 1 vote.</p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">9. Roadmap</h2>
              <h5>Q1 2025:</h5>
              <ul className="list-unstyled">
                <li>Concept and game design finalized.</li>
                <li>Tokenomics and game economy strategy outlined.</li>
                <li>Development of game assets and smart contract coding begins.</li>
              </ul>

              <h5>Q2 2025:</h5>
              <ul className="list-unstyled">
                <li>Pre-launch marketing campaign and community engagement.</li>
                <li>Presale and airdrop launch.</li>
                <li>Launch staking and reward mechanisms.</li>
              </ul>

              <h5>Q3 2025:</h5>
              <ul className="list-unstyled">
                <li>Full game launch with integrated token economy.</li>
                <li>Governance system live, with community voting on in-game changes.</li>
                <li>Continued development and release of new in-game items and features.</li>
              </ul>

              <h5>Q4 2025 and Beyond:</h5>
              <ul className="list-unstyled">
                <li>Regular game updates with new content.</li>
                <li>Scaling up staking rewards and player engagement.</li>
                <li>Expansion into new blockchain networks, if applicable (e.g., Polygon).</li>
              </ul>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">10. Conclusion</h2>
              <p>
                <strong>TASK</strong> is designed to be a sustainable and engaging in-game currency that empowers players to participate in a decentralized economy within MetaFarmers. Through its deflationary mechanics, controlled minting cap, yearly mint cap, staking rewards, and transparent governance system, it provides players with real value in a dynamic, blockchain-driven game environment.
              </p>
              <p>
                With a strong community, strategic presale and airdrop, and an engaging in-game economy, TASK is poised to be a leading token in the gaming industry, offering players both entertainment and economic opportunities.
              </p>
            </section>

            <section data-aos="fade-up" className="mb-5">
              <h2 className="text-center mb-4">11. Disclaimer</h2>
              <p>
                This white paper is for informational purposes only and is not an offer to sell or a solicitation of an offer to buy TASK tokens. The TASK token is not intended to be a security, and no investment is being made through the purchase of tokens.
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
