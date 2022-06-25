import "./DownloadCV.scss";
import { motion } from "framer-motion";

interface DownloadCVProps {}

function DownloadCV({}: DownloadCVProps) {
  return (
    <>
      <motion.a
        download="curriculum.pdf"
        href="/curriculum.pdf"
        className="downloadCurriculumBtn"
        whileHover={{ bottom: -150 }}
        transition={{ duration: 0.2, type: "spring", bounce: 0.25 }}
      >
        Download CV
      </motion.a>
    </>
  );
}

export default DownloadCV;
