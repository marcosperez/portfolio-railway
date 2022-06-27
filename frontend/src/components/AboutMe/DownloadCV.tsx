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
        whileHover={{ bottom: -150, transition: { duration: 0.1 } }}
        transition={{ duration: 1, type: "tween", delay: 3 }}
        animate={{ bottom: -173, opacity: 1 }}
      >
        Download PDF
      </motion.a>
    </>
  );
}

export default DownloadCV;
