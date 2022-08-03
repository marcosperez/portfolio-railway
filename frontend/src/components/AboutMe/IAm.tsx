import "./IAm.scss";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import i18n from "../../features/translations/locales/i18n";

interface IAmProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  setAuto: (v: boolean) => void;
  currentStep: number;
}

function IAm({ next, auto, setAuto }: IAmProps) {
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
      transition: { ease: "easeOut", duration: 0.8 },
    });
    setAuto(true);
    next(2);
  };

  useEffect(() => {
    sequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <span className="iAmText2">{`${i18n.t("hi")}`}</span>
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
          {`${i18n.t("Im")}`}
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
          {`${i18n.t("FullstackDev")}`}
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
              <div>{`${i18n.t("youWantMore")}`}</div>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default IAm;
