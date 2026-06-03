import SectionFour from "../components/SectionFour";
import SectionOne from "../components/SectionOne";
import SectionThree from "../components/SectionThree";
import SectionTwo from "../components/SectionTwo";
import StarsBackground from "../components/StarsBackground";

export default function Home() {
  return (
    <>
      <SectionOne />
      <div className="relative isolate overflow-hidden bg-gray-950">
        <StarsBackground />
        <div className="relative z-10">
          <SectionTwo />
          <SectionThree />
          <SectionFour />
        </div>
      </div>
    </>
  );
}
