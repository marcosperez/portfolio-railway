import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { setWindowSizes } from "./ConfigSlice";

export const useSetWindowSizes = () => {
  const dispatch = useAppDispatch();
  return (width: number, height: number) => {
    dispatch(setWindowSizes({ width, height }));
  };
};

export const GetSizes = () => {
  return useSelector((state: RootState) => [
    state.config.width,
    state.config.height,
  ]);
};
