import { Container } from "react-bootstrap";
import styles from "./UpcomingEvents.module.css";


function UpcomingEvents() {
  return (
    <section className={styles.eventsSection}>
      <Container>

        <h2 className={styles.title}>Upcoming events</h2>

        <div className={styles.eventItem}>
          <p className={styles.date}>• 28 December 2024</p>

          <h4>
            Future Vision Career Guidance: Shaping Your Professional Journey
          </h4>

          <p className={styles.desc}>
            Future Vision Career Guidance Shaping Your Future
          </p>

          <p className={styles.time}>
            10:00 AM-10:00 PM | <span>Read More...</span>
          </p>
        </div>

        <hr />

        <div className={styles.eventItem}>
          <p className={styles.date}>• 29 December 2024</p>

          <h4>
            Future Vision Career Guidance | Empowering Your Path to Success
          </h4>

          <p className={styles.desc}>
            What is Future Vision Career Guidance How we Help students to take
            admission there dreams colleges
          </p>

          <p className={styles.time}>
            10:00 AM-10:00 PM | <span>Read More...</span>
          </p>
        </div>

      </Container>
    </section>
  );
}

export default UpcomingEvents;