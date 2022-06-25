import "./Profile.scss";
import { motion } from "framer-motion";
import linkedin from "./img/linkedin_icon.png";
import github from "./img/git_icono.png";
import Badge from "../shared/Badge";

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
        transition={{ ease: "easeOut", duration: 1, when: "beforeChildren" }}
      >
        <motion.div
          className="profileTitle"
          animate={{ x: [-200, 90], y: [0, 0], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          PROFILE
        </motion.div>
        <motion.div
          className="divider"
          animate={{ x: [-200, 19], y: [7, 7], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
        ></motion.div>

        <motion.div
          animate={{ x: [-200, 20], y: [12, 12], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 1 }}
          className="profileDescription"
          onAnimationComplete={() => auto && goNext()}
        >
          <div className="label">Fullname</div>
          <div className="textData">Perez, Marcos Daniel</div>

          <div className="label">From</div>
          <div className="textData">Santa Fe, Argentina</div>

          <div className="label">Email</div>
          <div className="textData">marcos.d.perez@gmail.com</div>

          <div className="label">Mobile Phone</div>
          <div className="textData">+54 342-639312</div>
        </motion.div>

        <motion.div
          className="profileTitle"
          animate={{ x: [-80, 80], y: [40, 40], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 1.4 }}
        >
          EDUCTATIONS
        </motion.div>
        <motion.div
          className="divider"
          animate={{ x: [-80, 19], y: [48, 48], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 1.7 }}
        ></motion.div>

        <motion.div
          animate={{ x: [-80, 20], y: [58, 58], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 2 }}
          className="profileDescription"
          onAnimationComplete={() => auto && goNext()}
        >
          <div>
            <Badge>2008 - Ingenieria</Badge>
            <div>
              Ingenierie en sistemas de información en UTN Santa Fe Argentina
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <Badge>English</Badge>
            <div>Medium Level</div>
          </div>
        </motion.div>

        <motion.div
          animate={{ x: [-80, 30], y: [70, 70], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 2.3 }}
        >
          <div className="social-buttons">
            <a
              href="https://www.linkedin.com/in/marcos-perez-40942682"
              target={"_blank"}
            >
              <motion.img
                whileHover={{
                  scale: 1.2,
                  transition: { ease: "easeOut", duration: 0.5 },
                }}
                className="social-icon"
                src={linkedin}
              ></motion.img>
            </a>
            <a href="https://github.com/marcosperez" target={"_blank"}>
              <motion.img
                whileHover={{
                  scale: 1.2,
                  transition: { ease: "easeOut", duration: 0.5 },
                }}
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
