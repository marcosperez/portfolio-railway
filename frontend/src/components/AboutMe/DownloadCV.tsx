import "./DownloadCV.scss";
import { motion } from "framer-motion";
import i18n from "../../locales/i18n";

interface DownloadCVProps {}

function DownloadCV({}: DownloadCVProps) {
  return (
    <>
      <motion.a
        download="curriculum.pdf"
        href="/curriculum.pdf"
        className="downloadCurriculumBtn"
        whileHover={{ bottom: -150, transition: { duration: 0.1 } }}
        transition={{ duration: 1, type: "tween", delay: 0 }}
        animate={{ bottom: -173, opacity: 1 }}
      >
        {`${i18n.t("downloadCV")}`}
      </motion.a>
    </>
  );
}

export default DownloadCV;
