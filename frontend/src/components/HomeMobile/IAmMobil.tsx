import "./IAmMobil.scss";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import i18n from "../../features/translations/locales/i18n";

interface IAmMobilProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  setAuto: (v: boolean) => void;
  currentStep: number;
}

function IAmMobil({ next, auto, setAuto, currentStep }: IAmMobilProps) {
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

    setAuto(true);
    next(2);
  };

  useEffect(() => {
    sequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div className="IAmMobil">
      <motion.div className="group-iAmMobil IAmMobil" animate={controls}>
        <motion.div
          custom={0}
          whileHover={{
            scale: 1.2,
            transition: { ease: "easeOut", duration: 0.5 },
          }}
          animate={{
            opacity: [0, 0.5, 1],
            y: [-25, 0],
            transition: { ease: "easeOut", duration: 1.5 },
          }}
          className="iAmMobilText1"
        >
          <span className="iAmMobilText2">{`${i18n.t("hi")}`}</span>
        </motion.div>
        <motion.div
          custom={1}
          whileHover={{
            scale: 1.2,
            transition: { ease: "easeOut", duration: 0.5 },
          }}
          animate={{
            opacity: [0, 0.5, 1],
            y: [-25, 0],
            transition: { ease: "easeOut", duration: 1.5, delay: 1 },
          }}
          className="iAmMobilText1"
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
          className="iAmMobilText2"
        >
          {`${i18n.t("FullstackDev")}`}
        </motion.div>

        <motion.div
          custom={3}
          // animate={controlsButton}
          // whileHover={{
          //   scale: 1.2,
          //   transition: { ease: "easeOut", duration: 0.5 },
          // }}
          animate={{
            opacity: [0, 0.5, 1],
            y: [100, 50],
            transition: { ease: "easeOut", duration: 1.5, delay: 3 },
          }}
          className="buttonClick"
          // onAnimationComplete={() => auto && goNext()}
        >
          <Button onClick={goNext}>
            <div>
              {!hiddenButton && <div>{`${i18n.t("youWantMore")}`}</div>}
              {hiddenButton && <div>{`${i18n.t("scrollDown")}`}</div>}
            </div>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default IAmMobil;
