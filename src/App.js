import React from "react";
import { Container, Navbar, Card } from "react-bootstrap";
import { useAuth } from "react-oidc-context";

const posts = [
  { title: "First Blog Post", content: "This is my first blog post!" },
  { title: "Second Blog Post", content: "This is my second blog post!" },
];

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "1us07g33qbs5l00sdr1grcg2aj"; // Your App Client ID
    const logoutUri = "https://bittasker.xyz"; // Redirect after logout (root domain)
    const cognitoDomain = "https://auth.bittasker.xyz.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // Loading state
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // Authenticated state
  if (auth.isAuthenticated) {
    return (
      <div>
        <pre>Hello: {auth.user?.profile.email}</pre>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>
        <pre>Refresh Token: {auth.user?.refresh_token}</pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  // If not authenticated, show the main page
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

      <div>
        <button onClick={() => auth.signinRedirect()}>Sign in</button>
        <button onClick={signOutRedirect}>Sign out</button>
      </div>
    </>
  );
}

export default App;
