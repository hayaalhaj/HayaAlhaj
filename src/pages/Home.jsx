import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Design from "./Design";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Courses from "./Courses";
import Contact from "./Contact";

/* The main page: all the sections one after another */
const Home = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Design />
    <Experience />
    <Education />
    <Skills />
    <Courses />
    <Contact />
  </>
);

export default Home;