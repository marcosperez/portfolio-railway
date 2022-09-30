import "./DownloadCV.scss";
import { motion } from "framer-motion";
import i18n from "../../features/translations/locales/i18n";

function DownloadCV() {
  return (
    <>
      <motion.a
        download="curriculum.pdf"
        href="/curriculum.pdf"
        className="downloadCurriculumBtn"
        whileHover={{ bottom: -140, transition: { duration: 0.1 } }}
        transition={{ duration: 1, type: "tween", delay: 0 }}
        animate={{ bottom: -180, opacity: 1 }}
      >
        {`${i18n.t("downloadCV")}`}
      </motion.a>
    </>
  );
}

export default DownloadCV;
