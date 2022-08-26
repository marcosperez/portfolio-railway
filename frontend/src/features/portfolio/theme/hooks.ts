import { setThemeStorage, Themes } from "./ThemeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks";

export const useSetTheme = () => {
  const dispatch = useAppDispatch();
  return (theme: Themes) => {
    dispatch(setThemeStorage(theme));
  };
};

export const GetTheme = () => {
  return useSelector((state: RootState) => state.theme.theme);
};
