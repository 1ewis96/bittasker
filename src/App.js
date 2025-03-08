import React from "react";
import { Container, Navbar, Card } from "react-bootstrap";
import { useAuth } from "react-oidc-context";

// Example posts (you can customize this part based on your app's content)
const posts = [
  { title: "MetaFarmers", content: "Join Now!" },
  { title: "Resources", content: "Wallet & Exchange" },
    { title: "Other", content: "Restore" },
  { title: "Extra", content: "Backup" }
];

function App() {
  const auth = useAuth();

  // This function redirects the user to the Cognito logout endpoint
  const signOutRedirect = () => {
    const clientId = "1us07g33qbs5l00sdr1grcg2aj"; // Your App Client ID
    const logoutUri = "https://bittasker.xyz"; // Redirect after logout (root domain)
    const cognitoDomain = "https://auth.bittasker.xyz";
    
    // Redirect user to Cognito logout
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // Loading state while authentication is in progress
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // Error state if there was an error during authentication
  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // Authenticated state - show user profile information and tokens
  if (auth.isAuthenticated) {
    return (
      <div>
        <pre>Hello: {auth.user?.profile.email}</pre>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>
        <pre>Refresh Token: {auth.user?.refresh_token}</pre>

        {/* Button to sign out */}
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  // If not authenticated, show the main page with posts
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">BitTasker</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {/* Display posts */}
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
        {/* Buttons for Sign In and Sign Out */}
        <button onClick={() => auth.signinRedirect()}>Sign in</button>
        <button onClick={signOutRedirect}>Sign out</button>
      </div>
    </>
  );
}

export default App;
