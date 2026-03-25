import { Container, Row, Col } from "react-bootstrap";
import { GeoAlt, Envelope, Telephone } from "react-bootstrap-icons";
import styles from "./ContactPage.module.css";

function ContactPage() {
  const contactInfo = [
    {
      icon: <GeoAlt />,
      title: "Our Address",
      text: `Haware Infotech Park, A-1401, Sector 30, Near Vashi Railway Station, Vashi, Navi Mumbai - 400703.`,
    },
    {
      icon: <Envelope />,
      title: "Email Address",
      text: "balajieducationservices17@gmail.com",
    },
    {
      icon: <Telephone />,
      title: "Call Now",
      text: "+91-9324652984",
    },
  ];

  return (
    <div className={styles.contactPage}>
      <section className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <Container className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contact</h1>
          <p className={styles.breadcrumb}>
            Home <span>/</span> Contact
          </p>
        </Container>
      </section>

      <section className={styles.infoSection}>
        <Container>
          <Row className="g-4 justify-content-center">
            {contactInfo.map((item, index) => (
              <Col lg={4} md={6} key={index}>
                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>{item.icon}</div>
                  <div>
                    <h4 className={styles.infoTitle}>{item.title}</h4>
                    <p className={styles.infoText}>{item.text}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className={styles.mapSection}>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Haware%20Infotech%20Park,%20A-1401,%20Sector%2030,%20Near%20Vashi%20Railway%20Station,%20Vashi,%20Navi%20Mumbai%20400703&z=15&output=embed"
          className={styles.mapFrame}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
}

export default ContactPage;