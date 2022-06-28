import { createContext, useContext } from "react";
export type GlobalContent = {
  theme: string;
  setTheme: (c: string) => void;
  languaje: string;
  setLanguaje: (c: string) => void;
};

export const AppContext = createContext<GlobalContent>({
  theme: "",
  setTheme: () => {},
  languaje: "",
  setLanguaje: () => {},
});

export const useAppContext = () => useContext(AppContext);
