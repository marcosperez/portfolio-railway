import "./Button.scss";
import { motion } from "framer-motion";
import { ReactElement } from "react";

interface ButtonProps {
  onClick: () => void;
  classes?: string;
  children?: ReactElement | string;
}

function Button({ onClick, classes, children }: ButtonProps) {
  return (
    <motion.div className={`button outline ${classes}`} onClick={onClick}>
      {children}
    </motion.div>
  );
}

export default Button;
