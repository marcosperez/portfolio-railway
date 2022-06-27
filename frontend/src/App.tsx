import React, { useState } from "react";
import "./App.scss";
import Slider from "./components/shared/Slider";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home";

function App() {
  const [theme, setTheme] = useState<string>("light");

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
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
