import "./TextReveal.scss";
import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  onAnimationComplete?: () => void;
}

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function TextReveal({ children, onAnimationComplete }: TextRevealProps) {
  return (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay: 0.4, staggerChildren: 0.005 },
        },
      }}
      onAnimationComplete={onAnimationComplete}
    >
      {children.split("").map((char, index) => {
        return (
          <motion.span key={`${char}-${index}`} variants={letter}>
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export default TextReveal;
