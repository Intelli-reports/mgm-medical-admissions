import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


function NavigationBar() {
  return (
    <Navbar expand="lg" fixed="top" className={styles.glassNavbar}>
      <Container>
      <Navbar.Brand as={Link} to="/">
  <img
    src="/image/logo.png"
    alt="Logo"
    style={{ height: "50px", width: "auto" }}
  />
</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar" />

        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Home
            </Nav.Link>

            <Nav.Link className={styles.navLink}>About Us</Nav.Link>

            <NavDropdown title="University" id="course" className={styles.dropdownMenu}>
              <NavDropdown title="MGM University" id="mgm-sub">
                <NavDropdown.Item href="/mgm-kamote (1).html" className={styles.dropdownItem}>
                  MGM Medical College, Kamothe
                </NavDropdown.Item>
                <NavDropdown.Item href="/mgm-Kalamboli (1).html" className={styles.dropdownItem}>
                  MGM Medical College, Kalamboli
                </NavDropdown.Item>
                <NavDropdown.Item href="/mgm-nerul (1).html" className={styles.dropdownItem}>
                  MGM Medical College, Nerul
                </NavDropdown.Item>
                <NavDropdown.Item href="/mgm-sambhajinagar (1).html" className={styles.dropdownItem}>
                  MGM Medical College, Chhatrapati Sambhaji Nagar
                </NavDropdown.Item>
             
                <NavDropdown.Item href="/mgm-vashi (1).html" className={styles.dropdownItem}>
                  MGM Medical College, Vashi
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="DY Patil University" id="dy-sub">
                <NavDropdown.Item href="/DYPatil-pune1 (2).html" className={styles.dropdownItem}>
                  Dr. D.Y. Patil Medical College, Pune
                </NavDropdown.Item>
                <NavDropdown.Item href="/DY Patil-nerul1 (2).html" className={styles.dropdownItem}>
                  Dr. D.Y. Patil Medical College, Nerul
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Terna University" id="terna-sub">
                <NavDropdown.Item href="/Terna-medical-college (4).html" className={styles.dropdownItem}>
                  Terna Medical College, Nerul
                </NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>
            <Nav.Link as={Link} to="/Blogs" className={styles.navLink}>
             Blogs
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className={styles.navLink}>
              Contact
            </Nav.Link>
<Button as={Link} to="/whatsappPage" className={styles.applyBtn}>
  Apply Now
</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;