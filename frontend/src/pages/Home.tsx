import "./Home.scss";
import IAm from "../components/AboutMe/IAm";
import AboutMe from "../components/AboutMe/AboutMe";
import { useState } from "react";
import Profile from "../components/AboutMe/Profile";
import MiddleContainer from "../components/AboutMe/MiddleContainer";
import Experiences from "../components/AboutMe/Experiences";
import DownloadCV from "../components/AboutMe/DownloadCV";

function Home() {
  const [step, setStep] = useState(1);
  const [auto, setAuto] = useState(false);

  const next = (nextValue: number) => {
    setStep(nextValue);
  };
  return (
    <div className="Home">
      <div className="app-container">
        {step > 0 && (
          <IAm
            next={next}
            auto={auto}
            currentStep={step}
            setAuto={setAuto}
          ></IAm>
        )}
        {step > 1 && (
          <Profile next={next} auto={auto} currentStep={step}></Profile>
        )}
        {step > 2 && (
          <AboutMe next={next} auto={auto} currentStep={step}></AboutMe>
        )}
        {step > 3 && (
          <MiddleContainer next={next} auto={auto} currentStep={step}>
            <Experiences
              next={next}
              auto={auto}
              currentStep={step}
            ></Experiences>
          </MiddleContainer>
        )}

        <DownloadCV></DownloadCV>
      </div>
    </div>
  );
}

export default Home;
