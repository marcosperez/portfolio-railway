import { createContext, useContext } from "react";
export type GlobalContent = {
  theme: string;
  setTheme: (c: string) => void;
  languaje: string;
  setLanguaje: (c: string) => void;
  windowWidth: number;
  setWindowWidth: (c: number) => void;
  windowHeight: number;
  setWindowHeight: (c: number) => void;
};

export const AppContext = createContext<GlobalContent>({
  theme: "",
  setTheme: () => {},
  languaje: "",
  setLanguaje: () => {},
  windowWidth: window.innerWidth,
  setWindowWidth: () => {},
  windowHeight: window.innerHeight,
  setWindowHeight: () => {},
});

export const useAppContext = () => useContext(AppContext);