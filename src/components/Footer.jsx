import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">

          {/* Logo + Address */}
          <div className="col-md-4">
            <img src="/logo.png" alt="logo" className={styles.logo} />

            <p className={styles.address}>
              Office 4B, Mahalaxmi Metro Tower, Sector 4, Vaishali,
              Ghaziabad, Uttar Pradesh 201019
            </p>

            <div className={styles.social}>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-md-3">
            <h5>Useful Links</h5>
            <ul className={styles.links}>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Condition</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="col-md-3">
            <h5>Our Courses</h5>
            <ul className={styles.links}>
              <li>MD</li>
              <li>MBBS</li>
              <li>MS</li>
              <li>B-Tech</li>
              <li>MBS</li>
              <li>PGDM</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-2">
            <h5>Contact</h5>
            <p>📞 +91 9718 625 885</p>
            <p>📞 +91 9315 348 766</p>
            <p>✉ futurevision383@gmail.com</p>
          </div>

        </div>

        <hr />

        <div className={styles.bottom}>
          <p>© Copyright FUTURE VISION CAREER GUIDANCE All Rights Reserved</p>
          <span>Designed by Ecom360</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
