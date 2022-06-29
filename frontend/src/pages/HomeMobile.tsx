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
          animate={{ right: 20, opacity: [0, 0.2, 1] }}
          transition={{ duration: 1, delay: 0 }}
          initial={{
            position: "fixed",
            right: -100,
            top: 5,
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
          animate={{ left: 20, opacity: [0, 0.2, 1] }}
          transition={{ duration: 1, delay: 0 }}
          initial={{
            position: "fixed",
            left: -100,
            top: 5,
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

          {/* <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed at
            aspernatur a accusantium, voluptatem dolores molestias, maxime
            aperiam blanditiis facere dolorem autem tempore. Sunt sit impedit
            quod consectetur, quisquam accusamus.
          </motion.div> */}
          {/* <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={cardVariants}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed at
            aspernatur a accusantium, voluptatem dolores molestias, maxime
            aperiam blanditiis facere dolorem autem tempore. Sunt sit impedit
            quod consectetur, quisquam accusamus.
          </motion.div> */}
        </motion.div>
        {/* {step > 0 && (
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

        
        <motion.div
          animate={{ right: 60, opacity: [0, 0.2, 1] }}
          transition={{ duration: 0.5, delay: 3 }}
          initial={{ position: "absolute", right: 50, top: 5, opacity: 0 }}
        >
          <Slider
            onChange={changeLanguage}
            value2={"English"}
            value1={"Español"}
            value={languaje === "es"}
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
            value={theme === "dark"}
          ></Slider>
        </motion.div> */}
      </motion.div>
    </div>
  );
}

export default HomeMobile;
