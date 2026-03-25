import React from "react";
import { Container, Row, Col, Button, Navbar, Nav, Form } from "react-bootstrap";
import { BsWhatsapp, BsChevronDown, BsDownload } from "react-icons/bs";

function WhatsappPage() {
  return (
    <div style={{ backgroundColor: "#f7f5f3", minHeight: "100vh" }}>
      {/* Top Navbar */}
      <Navbar bg="transparent" expand="lg" className="py-3 px-4">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center fw-bold text-success fs-2">
            <BsWhatsapp className="me-2" />
            WhatsApp
          </Navbar.Brand>

          <Nav className="mx-auto d-none d-lg-flex gap-4 fs-5">
            <Nav.Link href="#" className="text-dark">Features <BsChevronDown size={14} /></Nav.Link>
            <Nav.Link href="#" className="text-dark">Privacy</Nav.Link>
            <Nav.Link href="#" className="text-dark">Help Center</Nav.Link>
            <Nav.Link href="#" className="text-dark">Blog</Nav.Link>
            <Nav.Link href="#" className="text-dark">For Business</Nav.Link>
            <Nav.Link href="#" className="text-dark">Apps</Nav.Link>
          </Nav>

          <Button
            variant="success"
            className="rounded-pill px-4 py-3 fs-5 d-flex align-items-center gap-2"
          >
            Download <BsDownload />
          </Button>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <h2 className="fw-normal mb-5">Chat on WhatsApp with +91-9324652984</h2>

            {/* Message Box */}
            <div
              className="mx-auto mb-5 position-relative"
              style={{
                backgroundColor: "#ece8e4",
                borderRadius: "24px",
                padding: "22px 55px 22px 30px",
                fontSize: "20px",
                color: "#4a4a4a",
                maxWidth: "700px",
              }}
            >
              Hello, I Want To Know More About Your courses!
              <div
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                  color: "#8a8a8a",
                  lineHeight: "18px",
                }}
              >
                ▲
                <br />
                ▼
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-column align-items-center gap-3">
              <Button
                variant="success"
                className="rounded-pill px-5 py-3 fs-4"
                style={{ width: "320px" }}
              >
                Open app
              </Button>

              <Button
                variant="light"
                className="rounded-pill px-5 py-3 fs-4 border-dark"
                style={{ width: "320px" }}
              >
                Continue to WhatsApp Web
              </Button>
            </div>

            {/* Footer Text */}
            <div className="mt-5 d-flex justify-content-center align-items-center fs-3">
              <BsWhatsapp className="text-success me-3" />
              <span>Don't have the app? </span>
              <a href="#" className="ms-2 text-success text-decoration-underline">
                Download it now
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WhatsappPage;