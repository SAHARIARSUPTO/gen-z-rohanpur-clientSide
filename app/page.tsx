import Footer from "./components/Footer/page";
import GenZInfoCards from "./components/Info/page";
import Intro from "./components/Intro/page";
import VolunteerRegistration from "./components/JoinUs/page";
import GenZMissionSection from "./components/Mission/page";
import Navbar from "./components/Navbar/page";
import UnionCardsSection from "./reports/page";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Intro></Intro>
      <GenZInfoCards></GenZInfoCards>
      <GenZMissionSection></GenZMissionSection>
      <VolunteerRegistration></VolunteerRegistration>
      <UnionCardsSection></UnionCardsSection>
      <Footer></Footer>
    </>
  );
}
