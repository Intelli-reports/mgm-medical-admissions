import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.aboutSection}>
      <Container>

        <Row className="align-items-center">

          {/* Left Content */}
          <Col lg={6}>
            <p className={styles.subtitle}>Our Story</p>

            <h1 className={styles.title}>
              Inspiring Futures, One Career at a Time
            </h1>

            <p className={styles.description}>
              Welcome to Future Vision Career Guidance, where we shape tomorrow’s
              leaders and innovators. We believe every student deserves a clear
              and purposeful career path. Our experienced career counselors and
              industry professionals guide individuals at every stage of their
              academic and professional journey.
            </p>

            <h5 className={styles.offerTitle}>What We Offer:</h5>

            <ul className={styles.offerList}>
              <li>Personalized Career Counseling</li>
              <li>Career Assessments & Planning</li>
              <li>College & Career Path Guidance</li>
              <li>Your future begins now – let's create it together.</li>
            </ul>
          </Col>

          {/* Right Image */}
          <Col lg={6}>
            <img
              src="/public/image/campus-1.webp"
              alt="college"
              className={styles.aboutImage}
            />
          </Col>

        </Row>

        {/* Mission Vision Cards */}
       <Row className={`mt-5 ${styles.cardRow}`}>

  <Col md={6} className="mb-4">
    <Card className={styles.infoCard}>
      <Card.Body>

        <div className={styles.cardHeader}>
          <span className={styles.line}></span>
          <h4>Our Mission</h4>
        </div>

        <p>
          To become a trusted career guidance partner, empowering students
          to achieve their dreams through informed decisions, expert
          counseling, and continuous support.
        </p>

      </Card.Body>
    </Card>
  </Col>

  <Col md={6} className="mb-4">
    <Card className={styles.infoCard}>
      <Card.Body>

        <div className={styles.cardHeader}>
          <span className={styles.line}></span>
          <h4>Our Vision</h4>
        </div>

        <p>
          To guide individuals with personalized career solutions,
          helping them choose the right education path, build skills,
          and create successful future-ready careers.
        </p>

      </Card.Body>
    </Card>
  </Col>

</Row>

      </Container>
    </section>
  );
}

export default About;