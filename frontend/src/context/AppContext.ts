import { createContext, useContext } from "react";
export type GlobalContent = {
  theme: string;
  setTheme: (c: string) => void;
};

export const AppContext = createContext<GlobalContent>({
  theme: "dark",
  setTheme: () => {},
});

export const useAppContext = () => useContext(AppContext);
