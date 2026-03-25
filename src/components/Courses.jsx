import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./Courses.module.css";

function Courses() {

  const [active, setActive] = useState(null);

  const courses = [
    {
      id: 1,
      title: "MBBS",
      desc: "Specialized support for MD admissions and advanced medical careers.",
      image: "/md.jpg",
      category: "Medical"
    },
    {
      id: 2,
      title: "MS",
      desc: "Focused counseling for MS programs and specialized medical career paths.",
      image: "public/image/ChatGPT Image Mar 20, 2026, 11_42_33 AM.png",
      category: "Medical"
    },
    {
      id: 3,
      title: "MD",
      desc: "Dedicated guidance for MBBS admissions and future doctor aspirations",
      image: "/mbbs.jpg",
      category: "Medical"
    }
  ];

  return (
    <section className={styles.courses}>
      <Container>

        <h2 className={styles.heading}>Featured Courses</h2>

        <Row>
          {courses.map((course) => (

            <Col md={4} key={course.id}>

            <Card
  className={styles.courseCard}
  onClick={() => setActive(course.id)}
  style={
    active === course.id
      ? { backgroundImage: `url(${course.image})` }
      : {}
  }
>
  <div className={styles.overlay}></div>

  <Card.Body className={styles.content}>

    <div className={styles.topRow}>
      <div className={styles.icon}>
        ↓
      </div>

      <span>{course.category}</span>
    </div>

    <h4>{course.title}</h4>
    <p>{course.desc}</p>

    <span className={styles.read}>Read ↗</span>

  </Card.Body>

</Card>

            </Col>

          ))}
        </Row>

      </Container>
    </section>
  );
}

export default Courses;