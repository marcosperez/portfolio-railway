import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { esLocale, enLocale } from ".";

const options = {
  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  debug: false,

  lng: "en",

  resources: {
    es: {
      common: esLocale["es-ES"],
    },
    en: {
      common: enLocale.en,
    },
  },

  fallbackLng: "en",

  ns: ["common"],

  defaultNS: "common",

  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
  },
};

i18n.use(LanguageDetector).init(options as any);

export default i18n;
