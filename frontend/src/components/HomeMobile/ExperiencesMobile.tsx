import "./ExperiencesMobile.scss";
import { motion } from "framer-motion";
import Badge from "../shared/Badge";
import i18n from "../../features/translations/locales/i18n";

function ExperiencesMobile() {
  return (
    <>
      <motion.div
        className="experiencesMobile"
        animate={{
          opacity: [0, 0.2, 1],
          transition: { delay: 0.4 },
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          when: "beforeChildren",
        }}
      >
        <motion.div className="title-text ">{`${i18n.t(
          "EXPERIENCE"
        )}`}</motion.div>
        <motion.div className="text ">
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0 }}
          >
            <Badge>{`${i18n.t("EXPERIENCES03/12/19")}`}</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.4 }}
            style={{ fontSize: "0.9em" }}
          >
            {`${i18n.t("EXPERIENCES03/12/19DESC")}`}
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.55 }}
            style={{ fontSize: "0.9em", marginTop: 10 }}
          >
            {`${i18n.t("EXPERIENCES03/12/19DESC2")}`}
          </motion.div>
        </motion.div>

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
          >
            <Badge>{`${i18n.t("EXPERIENCES15/07/19")}`}</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 1 }}
            style={{ fontSize: "0.9em" }}
          >
            {`${i18n.t("EXPERIENCES15/07/19DESC")}`}
          </motion.div>
        </motion.div>

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 1.2 }}
          >
            <Badge>{`${i18n.t("EXPERIENCES22/12/16")}`}</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 1.5 }}
            style={{ fontSize: "0.9em" }}
          >
            {`${i18n.t("EXPERIENCES22/12/16DESC")}`}
          </motion.div>
        </motion.div>

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 1.8 }}
          >
            <Badge>{`${i18n.t("EXPERIENCES15/07/14")}`}</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 2.1 }}
            style={{ fontSize: "0.9em" }}
          >
            <div>{`${i18n.t("EXPERIENCES15/07/14-1")}`}</div>
            <div>{`${i18n.t("EXPERIENCES15/07/14-2")}`}</div>
            <div>{`${i18n.t("EXPERIENCES15/07/14-3")}`}</div>
          </motion.div>
        </motion.div>

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 2.4 }}
          >
            <Badge>{`${i18n.t("Other knowledge")}`}</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 2.7 }}
            style={{ fontSize: "0.9em" }}
          >
            <div>
              * <strong>{`${i18n.t("Architecture")}`}</strong>
              {`${i18n.t("ArchitectureDesc")}`}
            </div>

            <div>
              * <strong>{`${i18n.t("Databases")}`}</strong>
              {`${i18n.t("DatabasesDesc")}`}
            </div>
            <div>
              * <strong>{`${i18n.t("Testing tools")}`}</strong>
              {`${i18n.t("Testing tools Desc")}`}
            </div>
            <div>
              * <strong>{`${i18n.t("Virtualización and Containers")}`}</strong>
              {`${i18n.t("Virtualización and Containers Desc")}`}
            </div>
            <div>
              * <strong>{`${i18n.t("CI/CD")}`}</strong>
              {`${i18n.t("CI/CD Desc")}`}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default ExperiencesMobile;
