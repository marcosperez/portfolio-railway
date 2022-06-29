import React, { useEffect, useState } from "react";
import "./App.scss";
import Slider from "./components/shared/Slider";
import { AppContext } from "./context/AppContext";
import i18n from "./locales/i18n";
import Home from "./pages/Home";
import HomeMobile from "./pages/HomeMobile";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const [languaje, setLanguaje] = useState<string>("en");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
    });
  }, []);

  const isMovil = windowWidth < 1200;
  const isMovilCls = isMovil ? "movil" : "";

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme: saveTheme,
        languaje,
        setLanguaje: saveLanguaje,
        windowWidth,
        setWindowWidth,
      }}
    >
      <div className={`App theme-${theme} ${isMovilCls}`}>
        <div className="background-back-app" />
        <div className="background" />

        {!isMovil && <Home></Home>}
        {isMovil && <HomeMobile></HomeMobile>}
      </div>
    </AppContext.Provider>
  );
}

export default App;
