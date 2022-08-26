import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import "./App.scss";
import { useStep } from "./features/portfolio/animations/hooks";
import { GetSizes, useSetWindowSizes } from "./features/config/hooks";
import { GetTheme, useSetTheme } from "./features/portfolio/theme/hooks";
import { Themes } from "./features/portfolio/theme/ThemeSlice";
import { GetLanguaje, useSetLanguaje } from "./features/translations/hooks";
import i18n from "./features/translations/locales/i18n";
import { Languajes } from "./features/translations/TranslationSlice";
import Home from "./pages/Home";
import HomeMobile from "./pages/HomeMobile";

function App() {
  const theme = GetTheme();
  const languaje = GetLanguaje();
  const setLanguaje = useSetLanguaje();
  const [windowWidth, windowHeight] = GetSizes();
  const setWindowSize = useSetWindowSizes();
  const step = useStep();
  i18n.changeLanguage(languaje);

  const setTheme = useSetTheme();
  useEffect(() => {
    const theme = localStorage.getItem("theme") as Themes;
    if (theme) {
      setTheme(theme);
    }

    const languaje = localStorage.getItem("languaje") as Languajes;
    if (languaje) {
      setLanguaje(languaje);
    }

    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth, window.innerHeight);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  return (
    <div className={`theme-${theme} ${isMovilCls}`}>
      <div className="App">
        <div className="background-back-app" />
        <div className="background" />
        <motion.div
          animate={controls}
          className="sun-moon"
          initial={{ bottom: -200, opacity: 1 }}
        ></motion.div>
        {theme === "dark" && (
          <motion.div
            animate={{
              bottom: windowHeight / 2 - 400,
              opacity: 1,
            }}
            initial={{ bottom: -400, opacity: 0, maxHeight: 0 }}
            transition={{ ease: "easeIn", delay: 0, duration: 5 }}
            style={{ zIndex: -99 }}
          >
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
          </motion.div>
        )}

        {!isMovil && <Home></Home>}
        {isMovil && <HomeMobile></HomeMobile>}
      </div>
    </div>
  );
}

export default App;
