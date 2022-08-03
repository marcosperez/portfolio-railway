import "./MiddleContainer.scss";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { GetSizes } from "../../features/config/hooks";

interface MiddleContainerProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
  children?: ReactElement;
}

const MIN_WIDTH = 1200;

function MiddleContainer({ next, auto, children }: MiddleContainerProps) {
  // const [windowWidth, setWindowWidth] = useState(
  //   Math.min(window.innerWidth, 1200)
  // );
  const [windowWidth] = GetSizes();
  const width = Math.min(windowWidth, MIN_WIDTH) - 600;
  const left = Math.min(windowWidth, MIN_WIDTH) / 2 - width / 2;
  const goNext = async () => {
    next(5);
  };

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
