import style from "./Hero.module.css";
import { FaTrophy, FaGlobe, FaGraduationCap, FaBuilding } from "react-icons/fa";

function Hero() {
  return (
    <div className={style.heroContainer}>

      {/* Background Video */}
      <video autoPlay loop muted className={style.heroVideo}>
        <source src="/video/istockphoto-1498919348-640_adpp_is.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className={style.heroOverlay}></div>

      {/* Hero Content */}
      <div className={`container ${style.heroContent}`}>
        <div className="row align-items-center">

          {/* LEFT TEXT */}
          <div className="col-md-6 text-white">

            <h1 className="display-4 fw-bold">
              MGM MBBS MD MS CAREER GUIDANCE
            </h1>

            <p className="lead">
              YOUR JOURNEY TO EXCELLENCE STARTS HERE
            </p>

            <button className="btn btn-primary me-3 px-4 py-2">
              Start Your Journey
            </button>

            <button className="btn btn-dark px-4 py-2">
              Discover Programs
            </button>

          </div>

          {/* RIGHT CARD */}
          <div className="col-md-6 d-flex justify-content-end">

            <div className={`p-4 ${style.statsCard}`}>

              <h3 className="text-center mb-4">Why Choose Us</h3>

              <div className="row">

                <div className="col-6 mb-3 d-flex align-items-center">
                  <div className={style.iconBox}>
                    <FaTrophy size={28} />
                  </div>
                  <div className="ms-3">
                    <h4>2,700+</h4>
                    <p>Happy Client</p>
                  </div>
                </div>

                <div className="col-6 mb-3 d-flex align-items-center">
                  <div className={style.iconBox}>
                    <FaGlobe size={28} />
                  </div>
                  <div className="ms-3">
                    <h4>20,000</h4>
                    <p>Student Counselled</p>
                  </div>
                </div>

                <div className="col-6 d-flex align-items-center">
                  <div className={style.iconBox}>
                    <FaGraduationCap size={28} />
                  </div>
                  <div className="ms-3">
                    <h4>969</h4>
                    <p>Admissions</p>
                  </div>
                </div>

                <div className="col-6 d-flex align-items-center">
                  <div className={style.iconBox}>
                    <FaBuilding size={28} />
                  </div>
                  <div className="ms-3">
                    <h4>1,623</h4>
                    <p>Success Rate</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>


      {/* 🔹 Bottom Section */}
      <div className={style.bottomSection}>
        <div className="container">
          <div className="row text-white text-center">

            <div className="col-md-4">
              <h5>College Insights</h5>
              <p>Explore Top Colleges and Understand Eligibility Criteria.</p>
            </div>

            <div className="col-md-4">
              <h5>Explore Your Future</h5>
              <p>Discover a journey toward a brighter tomorrow today!</p>
            </div>

            <div className="col-md-4">
              <h5>Expert Guidance</h5>
              <p>Support for Admissions and Securing your seat.</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Hero;