import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./Blogs.module.css";

function Blogs() {
  return (
    <section className={styles.blogSection}>
      <Container>

        <h2 className={styles.title}>Blogs</h2>

        <Row className="mt-5">

          {/* LEFT COLUMN */}
          <Col lg={3}>

            <Card className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <Card.Img src="/image/outer_blog_1.webp" />
                <span className={styles.tagRed}>MS Admission</span>
              </div>

              <Card.Body>
                <Card.Title>
                  How to Get Radiology Branch in NEET PG for Session 2025 in Top Colleges in India
                </Card.Title>

                <p className={styles.meta}>
                  May 13, 2025 • Radiology, Neet Pg, MD / MS Admission
                </p>
              </Card.Body>
            </Card>


            <Card className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <Card.Img src="/image/outer_blog_4.webp" />
                <span className={styles.tagGreen}>NEET UG</span>
              </div>

              <Card.Body>
                <Card.Title>
                  NEET UG Admission Guidance for Medical Colleges
                </Card.Title>
              </Card.Body>
            </Card>

          </Col>


          {/* CENTER COLUMN */}
          <Col lg={6}>

            <Card className={styles.featureCard}>

              <div className={styles.imageWrapper}>
                <Card.Img src="/image/outer_blog_2.webp" />
                <span className={styles.tagBlue}>MBBS</span>
              </div>

              <Card.Body>

                <Card.Title className={styles.featureTitle}>
                  Is NRI Quota Worth It for MBBS Admission 2025?
                  Criteria and Full Details
                </Card.Title>

                <Card.Text>
                  With MBBS seats being extremely competitive in India,
                  many students and families explore the option of
                  NRI Quota admissions. But is it worth it?
                </Card.Text>

              </Card.Body>

            </Card>

          </Col>


          {/* RIGHT COLUMN */}
          <Col lg={3}>

            <Card className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <Card.Img src="/image/outer_blog_3.webp" />
                <span className={styles.tagGreen}>NEET-PG</span>
              </div>

              <Card.Body>
                <Card.Title>
                  NEET-PG 2025: Exam Date Extended – What You Need to Know
                </Card.Title>

                <p className={styles.meta}>
                  08 Jun, 2025 • NEET-PG exam date extension
                </p>
              </Card.Body>
            </Card>


            <Card className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <Card.Img src="/image/outer_blog_5.webp" />
                <span className={styles.tagPurple}>MBBS</span>
              </div>

              <Card.Body>
                <Card.Title>
                  Understanding NEET 2025 Minimum Marks
                </Card.Title>
              </Card.Body>
            </Card>

          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default Blogs;