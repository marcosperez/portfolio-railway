import "./Badge.scss";
import { motion } from "framer-motion";
import { ReactElement } from "react";

interface BadgeProps {
  children?: ReactElement | string;
}

function Badge({ children }: BadgeProps) {
  return <motion.div className={`badge`}>{children}</motion.div>;
}

export default Badge;
