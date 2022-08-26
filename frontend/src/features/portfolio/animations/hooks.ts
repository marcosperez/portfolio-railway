import { setAuto, setStep } from "./AnimationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks";

export const useSetAuto = () => {
  const dispatch = useAppDispatch();
  return (auto: boolean) => {
    dispatch(setAuto(auto));
  };
};

export const useSetStep = () => {
  const dispatch = useAppDispatch();
  return (step: number) => {
    dispatch(setStep(step));
  };
};

export const useStep = () => {
  return useSelector((state: RootState) => state.animation.step);
};

export const useAuto = () => {
  return useSelector((state: RootState) => state.animation.auto);
};

export const useAutoState = (): [boolean, (step: boolean) => void] => {
  return [useAuto(), useSetAuto()];
};
export const useStepState = (): [number, (step: number) => void] => {
  return [useStep(), useSetStep()];
};
