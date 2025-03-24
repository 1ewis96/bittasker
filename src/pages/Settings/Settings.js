import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
import useAuthCheck from "../../hooks/auth/TokenValidation";
import Navigation from "../Navigation";
import Footer from "../Footer";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const Settings = () => {
  const { isAuthenticated } = useAuthCheck();
  const { refreshUserData, ethAddress } = useUser();

  const apiUrl = process.env.REACT_APP_HOST_API_URL;
  const s3Url = process.env.REACT_APP_S3_URL;
  const avatarLocation = process.env.REACT_APP_AVATAR_S3_LOCATION;
  const avatarAPI = `${apiUrl}/profile/avatar/`;

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const s3Bucket = process.env.REACT_APP_S3_URL;

  const connectMetaMask = async () => {
    // Connect to MetaMask logic
    console.log("Connecting to MetaMask...");
  };

  const disconnectMetaMask = async () => {
    // Disconnect MetaMask logic
    console.log("Disconnecting from MetaMask...");
  };

  const fetchAvatars = useCallback(async () => {
    if (!isAuthenticated) return;
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(avatarAPI, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAvatars(response.data.avatars);
    } catch (error) {
      console.error("Error fetching avatars", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, avatarAPI]);

  useEffect(() => {
    if (isAuthenticated) fetchAvatars();
  }, [isAuthenticated, fetchAvatars]);

  const handleAvatarClick = async (avatarId) => {
    if (!isAuthenticated) return;
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.post(
        avatarAPI,
        { avatar: avatarId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setSelectedAvatar(avatarId);
      console.log("Avatar updated successfully:", response.data);
      refreshUserData();
    } catch (error) {
      console.error("Error updating avatar", error);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordModalOpen(false);
  };

  return (
    <>
      <Navigation />
      <Container>
        {isAuthenticated ? (
          <>
            {/* Avatar Section */}
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <Card className="p-4 text-center bg-dark text-white">
                  <Card.Body>
                    <h4>Select Your Avatar</h4>
                    <Row>
                      {isLoading ? (
                        <Spinner animation="border" variant="light" />
                      ) : (
                        avatars.map((avatar) => (
                          <Col sm={4} md={3} lg={2} key={avatar.id}>
                            <Card
                              className={`avatar-card ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                              onClick={() => handleAvatarClick(avatar.id)}
                              style={{ cursor: "pointer", marginBottom: "1rem" }}
                            >
                              <Card.Img
                                variant="top"
                                src={`${s3Url}${avatarLocation}/${avatar.path}`}
                                alt={`Avatar ${avatar.id}`}
                              />
                            </Card>
                          </Col>
                        ))
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* MetaMask & Password Section */}
            <Row className="justify-content-center mt-4">
              <Col md={8} lg={6}>
                <Card className="p-4 text-center bg-dark text-white">
                  <Card.Body>
                    {/* MetaMask Button */}
                    {!ethAddress ? (
                      <Button
                        variant="dark"
                        style={{ backgroundColor: "#000" }}
                        onClick={connectMetaMask}
                        disabled={isLoading}
                      >
                        {isLoading ? "Connecting..." : "Connect to MetaMask"}
                        <img
                          src={`${s3Bucket}/static/metamask-logo.png`}
                          height="20px"
                          style={{ marginLeft: "5px" }}
                          alt="MetaMask logo"
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        style={{ backgroundColor: "#900" }}
                        onClick={disconnectMetaMask}
                        disabled={isLoading}
                      >
                        {isLoading ? "Disconnecting..." : "Unlink MetaMask"}
                        <img
                          src={`${s3Bucket}/static/metamask-logo.png`}
                          height="20px"
                          style={{ marginLeft: "5px" }}
                          alt="MetaMask logo"
                        />
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Change Password Button */}
            <Row className="justify-content-center mt-3">
              <Col md={8} lg={6}>
                <Card className="p-4 text-center bg-dark text-white">
                  <Card.Body>
                    <Button variant="primary" onClick={() => setPasswordModalOpen(true)}>
                      Change Password
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <p>You are not authenticated</p>
        )}
      </Container>

      {/* Password Change Modal */}
      <Modal show={isPasswordModalOpen} onHide={() => setPasswordModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Change Password</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default Settings;
