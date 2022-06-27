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

  return (
    <AppContext.Provider value={{ theme, setTheme, languaje, setLanguaje }}>
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
