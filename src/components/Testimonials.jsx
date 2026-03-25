import { Container, Row, Col, Card } from "react-bootstrap";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";

function Testimonials() {

  const reviews = [
    {
      name: "Ananya Sharma",
      text: "MGM MEDICAL MBBS CAREER GUIDANCE helped me choose the right career path with clear, honest, and professional guidance.",
      image: "/images/student1.jpg"
    },
    {
      name: "Rahul Mehta",
      text: "Expert guidance and honest counseling helped me select the right course and college.",
      image: "/images/student2.jpg"
    },
    {
      name: "Pooja Verma",
      text: "The counselors were supportive, knowledgeable, and guided me confidently through my admission process.",
      image: "/images/student3.jpg"
    }
  ];

  return (
    <section className={styles.section}>
      <Container>

        <h2 className={styles.title}>What Our Students Say</h2>

        <Row className="mt-5">

          {reviews.map((review, index) => (
            <Col md={4} key={index} className="mb-4">

              <Card className={styles.card}>

                <div className={styles.quoteIcon}>
                  <FaQuoteLeft />
                </div>

                <Card.Body>

                  <p className={styles.text}>“{review.text}”</p>

                  <hr />

                  <div className={styles.user}>
                    <img src={review.image} alt="student" />

                    <div>
                      <h5>{review.name}</h5>

                      <div className={styles.stars}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>

                </Card.Body>
              </Card>

            </Col>
          ))}

        </Row>

      </Container>
    </section>
  );
}

export default Testimonials;