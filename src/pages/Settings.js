import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import Navigation from "./Navigation";
import Footer from "./Footer";
import axios from "axios";

const Settings = () => {
  const auth = useAuth();
  const apiUrl = process.env.REACT_APP_HOST_API_URL;
  const s3Url = process.env.REACT_APP_S3_URL; // Get the S3 URL from the env variables
  const avatarLocation = process.env.REACT_APP_AVATAR_S3_LOCATION; // Get the Avatar Location from the env variables
  const avatarAPI = `${apiUrl}/profile/avatar/`;

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Fetch avatars on component mount
  const fetchAvatars = async () => {
    if (!auth.isAuthenticated) return; // Ensure user is authenticated

    try {
      const response = await axios.get(avatarAPI, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      setAvatars(response.data.avatars); // Populate the avatars state
    } catch (error) {
      console.error("Error fetching avatars", error);
    }
  };

  // Handle avatar selection
  const handleAvatarClick = async (avatarId) => {
    if (!auth.isAuthenticated) return; // Ensure user is authenticated

    try {
      const response = await axios.post(
        avatarAPI,
        { avatar: avatarId },
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      setSelectedAvatar(avatarId); // Update selected avatar
      console.log("Avatar updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating avatar", error);
    }
  };

  // Fetch avatars when the component mounts
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchAvatars();
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <Navigation />
      <Container>
        {auth.isAuthenticated ? (
          <>
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
