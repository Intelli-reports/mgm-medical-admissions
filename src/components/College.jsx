import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "./Colleges.module.css";

function Colleges() {
  const colleges = [
    {
      name: "MGM Medical College, Kamothe",
      image: "https://i.ibb.co/tTsyg6zm/Whats-App-Image-2026-03-20-at-2-39-37-PM.jpg",
   
      fees: "₹8640000.00",
      link: "/MGM-kamote.html",
    },
    {
      name: "MGM Medical College, Kalamboli",
      image: "https://i.ibb.co/60Hm1trb/kalamboli.jpg",
    
      fees: "₹7200000.00",
      link: "/MGM-kalamboli.html",
    },
    {
      name: "MGM Medical College, Nerul",
      image: "https://i.ibb.co/0R5n8HL4/MGM-nerulcollege.jpg",

      fees: "₹7200000.00",
      link: "/MGM-Nerul.html",
    },
    {
      name: "MGM Medical College, Chhatrapati Sambhaji Nagar",
      image: "https://i.ibb.co/cXrSF69L/sambhajinagar.jpg",
     
      fees: "₹10312500.00",
      link: "/MGM-Sambhajinagar.html",
    },
    {
      name: "MGM Medical College, Vashi",
      image: "https://i.ibb.co/PvjPkW5G/vashi-college.jpg",
      placement: "10 lakh",
   
      link: "/MGM-Vashi.html",
    },
    {
      name: "Dr. D.Y. Patil Medical College, Pune",
      image: "https://i.ibb.co/GfhkX873/Infrastructure-01.jpg",
      placement: "800000",
    
      link: "/DY Patil-pune1 (1).html",
    },
    {
      name: "Dr. D.Y. Patil Medical College, Nerul",
      image: "https://i.ibb.co/nsdpzwgY/122.jpg",
    
      fees: "₹7200000.00",
       link: "/DY Patil-nerul1 (1).html",
    },
    {
      name: "Terna Medical College, Nerul",
      image: "https://i.ibb.co/9kp250kK/mcv21363-Screenshot-1118.png",
    
      fees: "₹10312500.00",
      link: "/Terna-medical-college (1).html",
    },
  ];

  return (
    <Container fluid className={styles.collegesSection}>
      <Container>
        <h2 className={`text-center ${styles.collegesTitle}`}>
          Best Colleges of Medical
        </h2>

        <Row>
          {colleges.map((college, index) => (
            <Col lg={3} md={6} sm={12} key={index} className={styles.collegeCol}>
              <Card className={styles.collegeCard}>
                <div className={styles.imageWrapper}>
                  <Card.Img
                    variant="top"
                    src={college.image}
                    className={styles.collegeImg}
                  />
                
                </div>

                <Card.Body className={styles.collegeBody}>
                  <Card.Title className={styles.collegeName}>
                    {college.name}
                  </Card.Title>

                  <p className={styles.course}>MBBS MS MD</p>

                  {/* <p className={styles.fees}>
                    <strong>Total Fees:</strong> {college.fees}
                  </p> */}

            <Button
  href={college.link}
  className={styles.readMoreBtn}
>
  Read More →
</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Colleges;