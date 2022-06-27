import "./Slider.scss";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import i18n from "../../locales/i18n";

interface SliderProps {
  onChange: (v: boolean) => void;
  defaultValue?: boolean;
  value1: string;
  value2: string;
}

function Slider({ onChange, defaultValue, value1, value2 }: SliderProps) {
  const [value, setValue] = useState(defaultValue);

  const onClick = () => {
    setValue(!value);
    onChange(!value);
  };

  useEffect(() => {
    if (!value) {
      controls.start({
        left: 4,
        transition: { duration: 0.3 },
      });
    } else {
      controls.start({
        left: 130,
        transition: { duration: 0.3 },
      });
    }
  }, [value]);

  const controls = useAnimation();

  return (
    <motion.div className={`Slider`} onClick={onClick}>
      <motion.div className={`SliderDot`} animate={controls}></motion.div>
      {value && (
        <motion.div
          className={`SliderOn`}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {value1}
        </motion.div>
      )}
      {!value && (
        <motion.div
          className={`SliderOff`}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {value2}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Slider;
