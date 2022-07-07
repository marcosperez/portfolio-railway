import "./AboutMe.scss";
import { motion } from "framer-motion";
import TextReveal from "../shared/TextReveal";
import { useState } from "react";
import Badge from "../shared/Badge";
import i18n from "../../features/translations/locales/i18n";
import { GetSizes } from "../../features/config/hooks";

interface AboutMeProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
}

function AboutMe({ next, auto }: AboutMeProps) {
  const goNext = async () => {
    next(4);
  };
  const [rightYStart] = GetSizes();
  const [showText, setShowText] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);

  return (
    <>
      <motion.div
        className={`aboutMe`}
        animate={{ opacity: [0, 0.2, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, when: "beforeChildren" }}
      >
        <motion.div
          className="aboutMeTitle"
          animate={{ x: [rightYStart, 60], y: [0, 0], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
        >
          {`${i18n.t("ABOUT ME")}`}
        </motion.div>
        <motion.div
          className="divider"
          animate={{ x: [rightYStart, 0], y: [7, 7], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        ></motion.div>

        <motion.div
          animate={{ x: [rightYStart, 0], y: [15, 15], opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0, delay: 1 }}
          className="aboutMeDescription"
          onAnimationComplete={() => setShowText(true)}
        >
          {showText && (
            <TextReveal onAnimationComplete={() => setShowHobbies(true)}>
              {`${i18n.t("ABOUT ME DESC")}`}
            </TextReveal>
          )}
        </motion.div>

        {showHobbies && (
          <>
            <motion.div
              className="aboutMeTitle"
              animate={{
                x: [rightYStart, 60],
                y: [40, 40],
                opacity: [0, 0.2, 1],
              }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0 }}
            >
              {`${i18n.t("HOBBIES")}`}
            </motion.div>
            <motion.div
              className="divider"
              animate={{
                x: [rightYStart, 0],
                y: [49, 49],
                opacity: [0, 0.2, 1],
              }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
            ></motion.div>
            <motion.div
              className="aboutMeDescription "
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0, delay: 1 }}
              // onAnimationComplete={() => auto && goNext()}
            >
              <motion.div
                animate={{ x: [0, 0], y: [90, 59], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 1.5 }}
              >
                <Badge>{`${i18n.t("Sports")}`}</Badge>
                <div>{`${i18n.t("SportsHOBBIES")}`}</div>
              </motion.div>

              <motion.div
                style={{ marginTop: 10 }}
                animate={{ x: [0, 0], y: [110, 70], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 1.8 }}
                onAnimationComplete={() => auto && goNext()}
              >
                <Badge>{`${i18n.t("Entertainment")}`}</Badge>
                <div> {`${i18n.t("VideoGames")}`}</div>
                <div>{`${i18n.t("Books")}`}</div>
                <div>{`${i18n.t("Violin")}`} </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
}

export default AboutMe;
