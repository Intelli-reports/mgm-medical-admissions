import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaUsers, FaUserGraduate, FaMoneyBill, FaAward } from "react-icons/fa";
import styles from "./ExcellenceSection.module.css";

function ExcellenceSection() {
  return (
    <section className={styles.section}>
      <Container>
        <Row className="align-items-center">

          {/* LEFT SIDE */}
          <Col lg={6}>
            <h1 className={styles.title}>
              Excellence in Education for Over <br /> 50 Years
            </h1>

            <p className={styles.description}>
              With excellence in education spanning over 50 years, Future Vision
              Career Guidance stands as a trusted name in academic and career
              counseling. Our long-standing experience reflects deep
              understanding, proven expertise, and a strong commitment to
              student success.
            </p>

            <div className={styles.buttonGroup}>
              <Button className={styles.mainBtn}>Learn More</Button>
              <Button variant="outline-dark" className={styles.outlineBtn}>
                Virtual Tour
              </Button>
            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col lg={6}>
            <Row>

              <Col md={6} className="mb-4">
                <Card className={styles.card}>
                  <FaUsers className={styles.icon} />
                  <h2>2700</h2>
                  <p>Happy client</p>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className={styles.card}>
                  <FaUserGraduate className={styles.icon} />
                  <h2>20000</h2>
                  <p>Student counselled</p>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className={styles.card}>
                  <FaMoneyBill className={styles.icon} />
                  <h2>969+</h2>
                  <p>Admissions</p>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className={styles.card}>
                  <FaAward className={styles.icon} />
                  <h2>1623</h2>
                  <p>Success rate</p>
                </Card>
              </Col>

            </Row>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default ExcellenceSection;