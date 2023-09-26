import { motion } from "framer-motion";
import i18n from "../../features/translations/locales/i18n";
import Badge from "../shared/Badge";
import "./AboutMeMobile.scss";
import github from "./img/git_icono.png";
import linkedin from "./img/linkedin_icon.png";

interface AboutMeMobileProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
}

function AboutMeMobile({ next, auto }: AboutMeMobileProps) {
  const goNext = async () => {
    next(4);
  };

  return (
    <>
      <motion.div
        className={`aboutMeMobile`}
        animate={{ opacity: [0, 0.2, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, when: "beforeChildren" }}
      >
        <div className={`aboutMeMobileContainer`}>
          <motion.div
            className="aboutMeMobileTitle"
            animate={{ x: [-200, 0], y: [0, 0], opacity: [0, 0.2, 1] }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            {`${i18n.t("EDUCTATIONS")}`}{" "}
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
          >
            <div>
              <Badge>{`${i18n.t("2008 - Ingenieria")}`}</Badge>
              <div>{`${i18n.t("Title")}`}</div>
            </div>

            <div style={{ marginTop: 10 }}>
              <Badge>{`${i18n.t("English")}`}</Badge>
              <div>{`${i18n.t("Medium Level")}`}</div>
            </div>
          </motion.div>

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

            <motion.div
              animate={{ x: [-80, 0], y: [70, 70], opacity: [0, 0.2, 1] }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 2.1 }}
            >
              <div className="social-buttons">
                <a
                  href="https://www.linkedin.com/in/marcos-perez-40942682"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <motion.img
                    whileHover={{
                      scale: 1,
                      transition: { ease: "easeOut", duration: 0.5 },
                    }}
                    animate={{ y: [50, 0], opacity: [0, 0.2, 1] }}
                    transition={{ ease: "easeOut", duration: 0.5, delay: 2.5 }}
                    className="social-icon"
                    src={linkedin}
                  ></motion.img>
                </a>
                <a
                  href="https://github.com/marcosperez"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <motion.img
                    whileHover={{
                      scale: 1,
                      transition: { ease: "easeOut", duration: 0.5 },
                    }}
                    animate={{ y: [50, 0], opacity: [0, 0.2, 1] }}
                    transition={{ ease: "easeOut", duration: 0.5, delay: 2.7 }}
                    className="social-icon"
                    src={github}
                  ></motion.img>
                </a>
              </div>
            </motion.div>
          </>
        </div>
      </motion.div>
    </>
  );
}

export default AboutMeMobile;
