import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useAuthCheck from "../hooks/auth/TokenValidation"; // Import the useAuthCheck hook
import Navigation from "./Navigation";
import Footer from "./Footer";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Settings = () => {
  const { isAuthenticated } = useAuthCheck(); // Removed unused 'loading' and 'errorMessage'
  
  const { refreshUserData } = useUser();
	
  const apiUrl = process.env.REACT_APP_HOST_API_URL;
  const s3Url = process.env.REACT_APP_S3_URL; // Get the S3 URL from the env variables
  const avatarLocation = process.env.REACT_APP_AVATAR_S3_LOCATION; // Get the Avatar Location from the env variables
  const avatarAPI = `${apiUrl}/profile/avatar/`;

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Memoize fetchAvatars using useCallback
  const fetchAvatars = useCallback(async () => {
    if (!isAuthenticated) return; // Ensure user is authenticated

    const accessToken = localStorage.getItem("access_token"); // Get the access token from localStorage

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.get(avatarAPI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAvatars(response.data.avatars); // Populate the avatars state
    } catch (error) {
      console.error("Error fetching avatars", error);
    }
  }, [isAuthenticated, avatarAPI]);

  // Fetch avatars when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchAvatars();
    }
  }, [isAuthenticated, fetchAvatars]); // Add fetchAvatars to the dependency array

  // Handle avatar selection
  const handleAvatarClick = async (avatarId) => {
    if (!isAuthenticated) return; // Ensure user is authenticated

    const accessToken = localStorage.getItem("access_token"); // Get the access token from localStorage

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.post(
        avatarAPI,
        { avatar: avatarId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedAvatar(avatarId); // Update selected avatar
      console.log("Avatar updated successfully:", response.data);
	  refreshUserData();
	  
    } catch (error) {
      console.error("Error updating avatar", error);
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        {isAuthenticated ? (
          <>
		 <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 text-center bg-dark text-white">
              <Card.Body>
            <h3>Choose your avatar</h3>
            <Row>
              {avatars.map((avatar) => (
                <Col sm={4} md={3} lg={2} key={avatar.id}>
                  <Card
                    className={`avatar-card ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                    onClick={() => handleAvatarClick(avatar.id)}
                    style={{ cursor: "pointer", marginBottom: "1rem" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`${s3Url}${avatarLocation}/${avatar.path}`} // Prefix with the S3 URL and avatar location
                      alt={`Avatar ${avatar.id}`}
                    />
                    <Card.Body>
                      <Card.Title>Avatar {avatar.id}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
              </Card.Body>
			  </Card>
			  </Col>
			  </Row>
			  
			  
			  		 <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 text-center bg-dark text-white">
              <Card.Body>
			                    <Button
                    variant="dark"
                    style={{
                      backgroundColor: "#000",
                    }}
                    onClick={connectMetaMask}
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Connecting..." : "Connect to MetaMask"}
                    <img
                      src={`${s3Bucket}/static/metamask-logo.png`}
                      height="20px"
                      style={{
                        marginLeft: "5px",
                      }}
                      alt="MetaMask logo"
                    />
                  </Button>
			  </Card.Body>
			  </Card>
			</Col>
          </>
        ) : (
          <p>You are not authenticated</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Settings;
