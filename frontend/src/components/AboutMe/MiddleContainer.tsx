import "./MiddleContainer.scss";
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";

interface MiddleContainerProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
  children?: ReactElement;
}

function MiddleContainer({ next, auto, children }: MiddleContainerProps) {
  const [windowWidth, setWindowWidth] = useState(
    Math.min(window.innerWidth, 1200)
  );
  const width = windowWidth - 600;
  const left = windowWidth / 2 - width / 2;
  const goNext = async () => {
    next(5);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(Math.min(window.innerWidth, 1200));
    });
  }, []);

  return (
    <motion.div
      className="middle-container"
      style={{ width, left }}
      animate={{ opacity: [0, 0.2, 1] }}
      transition={{ ease: "easeOut", duration: 2 }}
      onAnimationComplete={() => auto && goNext()}
    >
      {children}
    </motion.div>
  );
}

export default MiddleContainer;
