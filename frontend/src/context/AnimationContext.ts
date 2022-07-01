import { createContext, useContext } from "react";
export type AnimationContent = {
  step: number;
  setStep: (c: number) => void;
  auto: boolean;
  setAuto: (c: boolean) => void;
};

export const AnimationContext = createContext<AnimationContent>({
  auto: false,
  setAuto: () => {},
  step: 1,
  setStep: () => {},
});

export const useAnimationContext = () => useContext(AnimationContext);
