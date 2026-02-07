import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import AboutHero from "../component/AboutHero";
import StoryTimeline from "../component/StoryTimeline";
import VisionMission from "../component/VisionMission";




// import AboutHero from "../components/AboutHero";
// import AboutMission from "../components/AboutMission";
// import AboutStats from "../components/AboutStats";
// import AboutTeam from "../components/AboutTeam";
// import AboutCTA from "../components/AboutCTA";

function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <StoryTimeline />
      <VisionMission />
      <Footer />
    </>
  );
}

export default AboutPage;
