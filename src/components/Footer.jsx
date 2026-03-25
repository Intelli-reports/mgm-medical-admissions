import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">

          {/* Logo + Address */}
          <div className="col-md-4">
            <img src="/image/logo.png" alt="logo" className={styles.logo} />

            <p className={styles.address}>
             Haware Infotech Park, A-1401,Sector 30, Near Vashi Railway Station, Vashi, Navi Mumbai - 400703.
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
              <li>MBS</li>
              
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-2">
            <h5>Contact</h5>
            <p>📞 +91 919324652984</p>
           
            <p>✉ balajieducationservices17@gmail.com</p>
          </div>

        </div>

        <hr />

        <div className={styles.bottom}>
          <p>© Copyright MGM  MEDICAL MBBS  CAREER GUIDANCE All Rights Reserved</p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
