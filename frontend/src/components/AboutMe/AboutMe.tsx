import "./AboutMe.scss";
import { motion } from "framer-motion";
import linkedin from "./img/linkedin_icon.png";
import github from "./img/git_icono.png";
import TextReveal from "../shared/TextReveal";
import { useState } from "react";
import Badge from "../shared/Badge";

interface AboutMeProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
}

function AboutMe({ next, auto }: AboutMeProps) {
  const goNext = async () => {
    next(4);
  };
  const rightYStart = window.innerWidth;
  const [showText, setShowText] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);

  return (
    <>
      <motion.div
        className="aboutMe"
        animate={{ opacity: [0, 0.2, 1] }}
        transition={{ ease: "easeOut", duration: 1, when: "beforeChildren" }}
      >
        <motion.div
          className="aboutMeTitle"
          animate={{ x: [rightYStart, 60], y: [0, 0], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 0 }}
        >
          ABOUT ME
        </motion.div>
        <motion.div
          className="divider"
          animate={{ x: [rightYStart, 0], y: [7, 7], opacity: [0, 0.2, 1] }}
          transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
        ></motion.div>

        <motion.div
          animate={{ x: [rightYStart, 0], y: [15, 15], opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0, delay: 1 }}
          className="aboutMeDescription"
          onAnimationComplete={() => setShowText(true)}
        >
          {showText && (
            <TextReveal onAnimationComplete={() => setShowHobbies(true)}>
              Me considero una persona responsable, capaz de afrontar desafíos
              tanto en equipo como unipersonalmente, con capacidades resolutivas
              y analiticas para tomar decisiones si es requerido. A su vez me
              gusta el desarrollo, me capacito y me mantengo activo para lograr
              adquirir conocimientos que me permitan crecer como profesional.
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
              transition={{ ease: "easeOut", duration: 1, delay: 0 }}
            >
              HOBBIES
            </motion.div>
            <motion.div
              className="divider"
              animate={{
                x: [rightYStart, 0],
                y: [49, 49],
                opacity: [0, 0.2, 1],
              }}
              transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
            ></motion.div>
            <motion.div
              className="aboutMeDescription "
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0, delay: 1 }}
              // onAnimationComplete={() => auto && goNext()}
            >
              <motion.div
                animate={{ x: [0, 0], y: [90, 59], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 1, delay: 1.5 }}
              >
                <Badge>Sports</Badge>
                <div>
                  Archery, Basquetball, Voleyball and functional excercise
                </div>
              </motion.div>

              <motion.div
                style={{ marginTop: 10 }}
                animate={{ x: [0, 0], y: [110, 70], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 1, delay: 1.8 }}
                onAnimationComplete={() => auto && goNext()}
              >
                <Badge>Entertainment</Badge>
                <div> * Video Games (Valorant)</div>
                <div> * Books and Netflix</div>
                <div> * Violin enthusiast</div>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
}

export default AboutMe;
