import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import "./App.scss";
import { AnimationContext } from "./context/AnimationContext";
import { AppContext } from "./context/AppContext";
import i18n from "./locales/i18n";
import Home from "./pages/Home";
import HomeMobile from "./pages/HomeMobile";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const [languaje, setLanguaje] = useState<string>("en");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // Animation
  const [step, setStep] = useState(1);
  const [auto, setAuto] = useState(false);
  i18n.changeLanguage(languaje);

  const saveTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  const saveLanguaje = (languaje: string) => {
    localStorage.setItem("languaje", languaje);
    setLanguaje(languaje);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    }

    const languaje = localStorage.getItem("languaje");
    if (languaje) {
      setLanguaje(languaje);
    }

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const isMovil = windowWidth < 1200;
  const isMovilCls = isMovil ? "movil" : "";
  const controls = useAnimation();
  controls.start({
    bottom: windowHeight / 2 - 250,
    opacity: 1,
    transition: { ease: "easeIn", delay: 0, duration: 5 },
  });

  useEffect(() => {
    if (step === 2 && !isMovil) {
      controls.start({
        right: 247,
        top: -65,
        width: 150,
        height: 150,
        transition: { ease: "easeOut", delay: 0, duration: 3 },
      });
    }
  }, [step]);
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme: saveTheme,
        languaje,
        setLanguaje: saveLanguaje,
        windowWidth,
        setWindowWidth,
        windowHeight,
        setWindowHeight,
      }}
    >
      <AnimationContext.Provider
        value={{
          step,
          setStep,
          auto,
          setAuto,
        }}
      >
        <div className={`theme-${theme} ${isMovilCls}`}>
          <div className="App">
            <div className="background-back-app" />
            <motion.div
              animate={controls}
              className="sun-moon"
              initial={{ bottom: -200, opacity: 1 }}
            ></motion.div>
            {theme === "dark" && (
              <motion.div
                animate={{
                  bottom: windowHeight / 2 - 200,
                  opacity: 1,
                }}
                initial={{ bottom: -200, opacity: 0 }}
                transition={{ ease: "easeIn", delay: 0, duration: 5 }}
              >
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
              </motion.div>
            )}
            <div className="background" />

            {!isMovil && <Home></Home>}
            {isMovil && <HomeMobile></HomeMobile>}
          </div>
        </div>
      </AnimationContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
