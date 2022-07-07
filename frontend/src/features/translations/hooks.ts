import { Languajes, setLanguajeStorage } from "./TranslationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";

export const useSetLanguaje = () => {
  const dispatch = useAppDispatch();
  return (languaje: Languajes) => {
    dispatch(setLanguajeStorage(languaje));
  };
};

export const GetLanguaje = () => {
  return useSelector((state: RootState) => state.translation.languaje);
};

export const useLanguajeState = (): [
  Languajes,
  (languaje: Languajes) => void
] => {
  const languaje = GetLanguaje();
  const setLanguaje = useSetLanguaje();

  return [languaje, setLanguaje];
};
