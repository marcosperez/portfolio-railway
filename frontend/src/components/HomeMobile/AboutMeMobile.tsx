import "./AboutMeMobile.scss";
import { motion } from "framer-motion";
import TextReveal from "../shared/TextReveal";
import { useState } from "react";
import Badge from "../shared/Badge";
import { useAppContext } from "../../context/AppContext";
import i18n from "../../features/translations/locales/i18n";

interface AboutMeMobileProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
}

function AboutMeMobile({ next, auto }: AboutMeMobileProps) {
  const goNext = async () => {
    next(4);
  };
  const [showText, setShowText] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);

  return (
    <>
      <motion.div
        className={`aboutMeMobile`}
        animate={{ opacity: [0, 0.2, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, when: "beforeChildren" }}
      >
        <motion.div
          className="aboutMeMobileTitle"
          animate={{ x: [-200, 0], y: [0, 0], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          {`${i18n.t("ABOUT ME")}`}
        </motion.div>
        <motion.div
          className="divider"
          animate={{ x: [-200, 0], y: [0, 0], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        ></motion.div>

        <motion.div
          animate={{ x: [-200, 0], y: [0, 0], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="aboutMeMobileDescription"
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
              className="aboutMeMobileTitle"
              animate={{ x: [-200, 0], y: [0, 0], opacity: [0, 0.2, 1] }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              {`${i18n.t("HOBBIES")}`}
            </motion.div>
            <motion.div
              className="divider"
              animate={{ x: [-200, 0], y: [0, 0], opacity: [0, 0.2, 1] }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            ></motion.div>
            <motion.div
              className="aboutMeMobileDescription "
              animate={{ x: [-200, 0], y: [0, 0], opacity: [0, 0.2, 1] }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <motion.div
                animate={{ x: [0, 0], y: [90, 0], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 1.5 }}
              >
                <Badge>{`${i18n.t("Sports")}`}</Badge>
                <div>{`${i18n.t("SportsHOBBIES")}`}</div>
              </motion.div>

              <motion.div
                style={{ marginTop: 10 }}
                animate={{ x: [0, 0], y: [110, 10], opacity: [0, 1] }}
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

export default AboutMeMobile;
