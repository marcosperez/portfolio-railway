import "./HomeMobile.scss";
import IAm from "../components/AboutMe/IAm";
import AboutMe from "../components/AboutMe/AboutMe";
import { useState } from "react";
import Profile from "../components/AboutMe/Profile";
import MiddleContainer from "../components/AboutMe/MiddleContainer";
import Experiences from "../components/AboutMe/Experiences";
import DownloadCV from "../components/AboutMe/DownloadCV";
import Slider from "../components/shared/Slider";
import { useAppContext } from "../context/AppContext";
import { motion, Variants } from "framer-motion";
import i18n from "../locales/i18n";
import IAmMobil from "../components/HomeMobile/IAmMobil";
import ProfileMobil from "../components/HomeMobile/ProfileMobile";
import AboutMeMobile from "../components/HomeMobile/AboutMeMobile";
import ExperiencesMobile from "../components/HomeMobile/ExperiencesMobile";

const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  onscreen: {
    opacity: 1,
    transition: {
      // type: "spring",
      // bounce: 0.4,
      duration: 1.5,
    },
  },
};

function HomeMobile() {
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

  console.log(theme);
  console.log(languaje);

  return (
    <div className="HomeMobile">
      <motion.div className="app-container">
        <DownloadCV></DownloadCV>
        <motion.div
          animate={{ right: 20, top: 15, opacity: [0, 0.2, 1] }}
          transition={{ duration: 1, delay: 0 }}
          initial={{
            position: "fixed",
            right: -100,
            top: 15,
            opacity: 0,
            zIndex: 10,
          }}
        >
          <Slider
            onChange={changeLanguage}
            value2={"English"}
            value1={"Español"}
            value={languaje === "es"}
          ></Slider>
        </motion.div>

        <motion.div
          animate={{ left: 20, top: 15, opacity: [0, 0.2, 1] }}
          transition={{ duration: 1, delay: 0 }}
          initial={{
            position: "fixed",
            left: -100,
            top: 15,
            opacity: 0,
            zIndex: 10,
          }}
        >
          <Slider
            onChange={changeTheme}
            value1={i18n.t("off")}
            value2={i18n.t("on")}
            value={theme === "dark"}
          ></Slider>
        </motion.div>
        <motion.div>
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
          >
            <IAmMobil
              next={next}
              auto={auto}
              currentStep={step}
              setAuto={setAuto}
            ></IAmMobil>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
          >
            <ProfileMobil
              next={next}
              auto={auto}
              currentStep={step}
            ></ProfileMobil>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
          >
            <AboutMeMobile
              next={next}
              auto={auto}
              currentStep={step}
            ></AboutMeMobile>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
          >
            <ExperiencesMobile
              next={next}
              auto={auto}
              currentStep={step}
            ></ExperiencesMobile>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomeMobile;
