import React, { useEffect, useState } from "react";
import "./App.scss";
import Slider from "./components/shared/Slider";
import { AppContext } from "./context/AppContext";
import i18n from "./locales/i18n";
import Home from "./pages/Home";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const [languaje, setLanguaje] = useState<string>("en");
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
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme: saveTheme,
        languaje,
        setLanguaje: saveLanguaje,
      }}
    >
      <div className={`theme-${theme}`}>
        <div className={`App`}>
          <div className="background-back-app" />
          <div className="background" />

          <Home></Home>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
