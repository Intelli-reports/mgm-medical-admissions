import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import styles from "./Navbar.module.css";

function NavigationBar() {
  return (
    <Navbar expand="lg" fixed="top" className={styles.glassNavbar}>
      <Container>

        <Navbar.Brand href="#">Logo</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar" />

        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto align-items-center">

            <Nav.Link className={styles.navLink}>Home</Nav.Link>
            <Nav.Link className={styles.navLink}>About Us</Nav.Link>

   <NavDropdown title="University" id="course">
  <NavDropdown.Item href="/public/index (2).html">
    MGM Medical Colleges
  </NavDropdown.Item>

  <NavDropdown.Item href="/dypatil.html">
    DY Patil Medical Colleges
  </NavDropdown.Item>

  <NavDropdown.Item href="/terna.html">
    Terna Medical Colleges
  </NavDropdown.Item>
</NavDropdown>

            <Nav.Link className={styles.navLink}>Contact</Nav.Link>

            <Button className={styles.applyBtn}>
              Apply Now
            </Button>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavigationBar;