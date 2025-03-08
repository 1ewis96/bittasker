import React from "react";
import { Container, Navbar, Card } from "react-bootstrap";

const posts = [
  { title: "MetaFarmers.io", content: "Online multiplayer MMO, Crypto-Verse." },
  { title: "Our Products", content: "Wallet,Exchange,Trade" },
  { title: "Extra", content: "Terms,Privacy, BitTasker Inc" },
];

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">BitTasker</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {posts.map((post, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default App;
