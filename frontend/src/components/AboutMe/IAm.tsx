import "./IAm.scss";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../shared/Button";

interface IAmProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
}

function IAm({ next, auto }: IAmProps) {
  const controls = useAnimation();
  let middle = Math.min(window.innerWidth, 1200) / 2 - 225;
  const startDelay = auto ? 5 : 0;

  const [hiddenButton, setHiddenButton] = useState(false);
  const sequence = async () => {
    await controls.start({
      y: [200, 200],
      x: [middle, middle],
      fontSize: ["22px", "30px"],
      transition: { ease: "easeOut", duration: 0, delay: startDelay },
    });
  };

  const goNext = async () => {
    setHiddenButton(true);
    await controls.start({
      y: 40,
      x: 40,
      // opacity: [0, 0.4, 1],
      width: "200px",
      fontSize: "22px",
      transition: { ease: "easeOut", duration: 1.2 },
    });
    next(2);
  };

  useEffect(() => {
    sequence();
  }, []);

  return (
    <>
      <motion.div
        className="group-iam"
        animate={controls}
        // animate={{ z: [500, 0] }}
        // transition={{ ease: "easeOut", duration: 1 }}
      >
        <motion.div
          custom={0}
          //   animate={controls}
          whileHover={{
            scale: 1.2,
            transition: { ease: "easeOut", duration: 0.5 },
          }}
          animate={{
            opacity: [0, 0.5, 1],
            y: [-25, 0],
            transition: { ease: "easeOut", duration: 1.5 },
          }}
          className="iAmText1"
        >
          <span className="iAmText2">Hi</span>
        </motion.div>
        <motion.div
          custom={1}
          //   animate={controls}
          whileHover={{
            scale: 1.2,
            transition: { ease: "easeOut", duration: 0.5 },
          }}
          animate={{
            opacity: [0, 0.5, 1],
            y: [-25, 0],
            transition: { ease: "easeOut", duration: 1.5, delay: 1 },
          }}
          className="iAmText1"
        >
          I'm Marcos!
          {/* Fullstack Developer */}
        </motion.div>
        <motion.div
          custom={2}
          whileHover={{
            scale: 1.2,
            transition: { ease: "easeOut", duration: 0.5 },
          }}
          animate={{
            opacity: [0, 0.5, 1],
            y: [-25, 0],
            transition: { ease: "easeOut", duration: 1.5, delay: 2 },
          }}
          className="iAmText2"
        >
          Fullstack Developer
          {/* Based in Argentina */}
        </motion.div>

        {!hiddenButton && (
          <motion.div
            custom={3}
            whileHover={{
              scale: 1.2,
              transition: { ease: "easeOut", duration: 0.5 },
            }}
            animate={{
              opacity: [0, 0.5, 1],
              y: [100, 50],
              transition: { ease: "easeOut", duration: 1.5, delay: 3 },
            }}
            className="buttonClick"
            onAnimationComplete={() => auto && goNext()}
          >
            <Button onClick={goNext}>
              <div>I want to know more</div>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default IAm;
