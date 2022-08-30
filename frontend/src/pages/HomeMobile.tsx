import "./HomeMobile.scss";
import { useEffect, useRef } from "react";
import DownloadCV from "../components/shared/DownloadCV";
import Slider from "../components/shared/Slider";
import { motion, Variants } from "framer-motion";
import i18n from "../features/translations/locales/i18n";
import IAmMobil from "../components/HomeMobile/IAmMobil";
import ProfileMobil from "../components/HomeMobile/ProfileMobile";
import AboutMeMobile from "../components/HomeMobile/AboutMeMobile";
import ExperiencesMobile from "../components/HomeMobile/ExperiencesMobile";
import { GetTheme, useSetTheme } from "../features/portfolio/theme/hooks";
import { useLanguajeState } from "../features/translations/hooks";
import {
  useAutoState,
  useStepState,
} from "../features/portfolio/animations/hooks";

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
  const [languaje, setLanguaje] = useLanguajeState();
  const [auto, setAuto] = useAutoState();
  const [step, setStep] = useStepState();
  const theme = GetTheme();

  const next = (nextValue: number) => {
    setStep(nextValue);
  };
  const setTheme = useSetTheme();
  const changeTheme = (v: boolean) => {
    setTheme(v ? "dark" : "light");
  };

  const changeLanguage = (v: boolean) => {
    setLanguaje(!v ? "en" : "es");
  };

  const IAmRef = useRef<HTMLDivElement>(null);
  useEffect(() => {});

  const ProfileMobileRef = useRef<HTMLDivElement>(null);
  const scrollProfile = () => {
    ProfileMobileRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (step === 2) {
      scrollProfile();
    }
  }, [step]);

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
        <motion.div ref={IAmRef}>
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
            ref={ProfileMobileRef}
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
            <ExperiencesMobile></ExperiencesMobile>
          </motion.div>
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
      </motion.div>
    </div>
  );
}

export default HomeMobile;
