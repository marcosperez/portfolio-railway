import "./Profile.scss";
import { motion } from "framer-motion";
import linkedin from "./img/linkedin_icon.png";
import github from "./img/git_icono.png";
import Badge from "../shared/Badge";
import i18n from "../../features/translations/locales/i18n";

interface ProfileProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
}

function Profile({ next, auto }: ProfileProps) {
  const goNext = async () => {
    next(3);
  };

  return (
    <>
      <motion.div
        className="profile"
        animate={{ opacity: [0, 0.2, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, when: "beforeChildren" }}
      >
        <motion.div
          className="profileTitle"
          animate={{ x: [-200, 90], y: [0, 0], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          {`${i18n.t("PROFILE")}`}
        </motion.div>
        <motion.div
          className="divider"
          animate={{ x: [-200, 19], y: [7, 7], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        ></motion.div>

        <motion.div
          animate={{ x: [-200, 20], y: [12, 12], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 1 }}
          className="profileDescription"
          onAnimationComplete={() => auto && goNext()}
        >
          <div className="label">{`${i18n.t("Fullname")}`}</div>
          <div className="textData">{`${i18n.t("Perez, Marcos Daniel")}`}</div>

          <div className="label">{`${i18n.t("From")}`}</div>
          <div className="textData">{`${i18n.t("Santa Fe, Argentina")}`}</div>

          <div className="label">{`${i18n.t("Email")}`}</div>
          <div className="textData">{`${i18n.t(
            "marcos.d.perez@gmail.com"
          )}`}</div>

          <div className="label">{`${i18n.t("Mobile Phone")}`}</div>
          <div className="textData">+54 342-639312</div>
        </motion.div>

        <motion.div
          className="profileTitle"
          animate={{ x: [-80, 80], y: [40, 40], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 1.4 }}
        >
          {`${i18n.t("EDUCTATIONS")}`}
        </motion.div>
        <motion.div
          className="divider"
          animate={{ x: [-80, 19], y: [48, 48], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 1.7 }}
        ></motion.div>

        <motion.div
          animate={{ x: [-80, 20], y: [58, 58], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 2 }}
          className="profileDescription"
          onAnimationComplete={() => auto && goNext()}
        >
          <div>
            <Badge>{`${i18n.t("2008 - Ingenieria")}`}</Badge>
            <div>{`${i18n.t("Title")}`}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            <Badge>{`${i18n.t("Español")}`}</Badge>
            <div>{`${i18n.t("Español Level")}`}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            <Badge>{`${i18n.t("English")}`}</Badge>
            <div>{`${i18n.t("Medium Level")}`}</div>
          </div>
        </motion.div>

        <motion.div
          animate={{ x: [-80, 30], y: [70, 70], opacity: [0, 0.2, 1] }}
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
                  scale: 1.2,
                  transition: { ease: "easeOut", duration: 0.5 },
                }}
                animate={{ y: [50, 0], opacity: [0, 0.2, 1] }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 2.5 }}
                className="social-icon"
                src={linkedin}
                width={50}
              ></motion.img>
            </a>
            <a
              href="https://github.com/marcosperez"
              target={"_blank"}
              rel="noreferrer"
            >
              <motion.img
                whileHover={{
                  scale: 1.2,
                  transition: { ease: "easeOut", duration: 0.5 },
                }}
                width={50}
                animate={{ y: [50, 0], opacity: [0, 0.2, 1] }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 2.7 }}
                className="social-icon"
                src={github}
              ></motion.img>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Profile;
