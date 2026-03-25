import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";

import Courses from "../components/Courses";
import Colleges from "../components/College";
import ExcellenceSection from "../components/ExcellenceSection";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import UpcomingEvents from "../components/UpcomingEvent";
import Blogs from "../components/Blogs";




function Home() {
  return (
    <>
   
      <Hero/>
      <About/>
     
      <Courses />
      <Colleges />
      <ExcellenceSection />
      <Testimonials/>
       <UpcomingEvents />
       <Blogs/>
      <Footer />
    </>
  );
}

export default Home;