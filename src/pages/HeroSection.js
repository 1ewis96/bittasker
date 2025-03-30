import React from "react";
import { Button, Container } from "react-bootstrap";

const HeroSection = () => {
  return (
    <Container className="mt-4">
    <div className="position-relative overflow-hidden px-0 py-3 py-md-5 m-md-0 text-center bg-dark text-white">
      {/* Video Background */}
      <div className="position-absolute top-0 left-0 w-100 h-100">
        <video
          className="w-100 h-100 object-fit-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://s3.bittasker.xyz/static/default.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="position-absolute top-0 left-0 w-100 h-100 bg-dark opacity-50"></div>

      {/* Centered Content */}
      <div className="container-fluid position-relative z-index-1 px-3 px-md-5">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold">MetaFarmers</h1>
          <h3 className="fw-normal text-light mb-3">Explore & Have Fun!</h3>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">
            <a
              className="icon-link text-light"
              href="https://metafarmers.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn more
              <svg
                className="bi"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793L9.146 3.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </a>
            <a
              className="icon-link text-light"
              href="https://metafarmers.io/client"
              rel="noopener noreferrer"
              target="_blank"
            >
              Client
              <svg
                className="bi"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793L9.146 3.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default HeroSection;
