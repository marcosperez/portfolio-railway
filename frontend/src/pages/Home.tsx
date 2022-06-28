import "./Home.scss";
import IAm from "../components/AboutMe/IAm";
import AboutMe from "../components/AboutMe/AboutMe";
import { useState } from "react";
import Profile from "../components/AboutMe/Profile";
import MiddleContainer from "../components/AboutMe/MiddleContainer";
import Experiences from "../components/AboutMe/Experiences";
import DownloadCV from "../components/AboutMe/DownloadCV";
import Slider from "../components/shared/Slider";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import i18n from "../locales/i18n";

function Home() {
  const [step, setStep] = useState(1);
  const [auto, setAuto] = useState(false);
  const { setTheme, theme, setLanguaje, languaje } = useAppContext();

  const next = (nextValue: number) => {
    setStep(nextValue);
  };
  const changeTheme = (v: boolean) => {
    setTheme(v ? "dark" : "light");
  };

  const changeLanguage = (v: boolean) => {
    setLanguaje(!v ? "en" : "es");
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
        <motion.div
          animate={{ right: 60, opacity: [0, 0.2, 1] }}
          transition={{ duration: 0.5, delay: 3 }}
          initial={{ position: "absolute", right: 50, top: 5, opacity: 0 }}
        >
          <Slider
            onChange={changeLanguage}
            value2={"English"}
            value1={"Español"}
            defaultValue={languaje === "en"}
          ></Slider>
        </motion.div>

        <motion.div
          animate={{ right: 60, top: 47, opacity: [0, 0.2, 1] }}
          transition={{ duration: 0.5, delay: 3 }}
          initial={{ position: "absolute", right: 50, top: 47, opacity: 0 }}
        >
          <Slider
            onChange={changeTheme}
            value1={i18n.t("off")}
            value2={i18n.t("on")}
            defaultValue={theme === "light"}
          ></Slider>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
