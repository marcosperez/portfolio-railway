import { useDispatch } from "react-redux";
import { changeTheme } from "./ThemeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useSetTheme = () => {
  const dispatch = useDispatch();
  return (theme: "light" | "dark") => {
    dispatch(changeTheme(theme));
  };
};

export const GetTheme = () => {
  return useSelector((state: RootState) => state.theme.theme);
};
