import { Container } from "react-bootstrap";
import styles from "./TopBar.module.css";

function TopBar() {
  return (
    <div className={styles.topbar}>
      <Container fluid>
        <div className={styles.scrollWrapper}>
          <div className={styles.scrollText}>
            📢 MBBS Admission 2026 Open — 200 Seats Available &nbsp;&nbsp; | &nbsp;&nbsp;
            🏆 NAAC Grade A+ Accredited — Premier Medical College &nbsp;&nbsp; | &nbsp;&nbsp;
            🏥 1500+ Bed Teaching Hospital
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TopBar;