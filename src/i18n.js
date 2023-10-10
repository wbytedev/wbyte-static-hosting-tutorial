import NextI18Next from "next-i18next";
import { localeSubpaths } from "publicRuntimeConfig";
import { resolve } from "path";

export default new NextI18Next({
  otherLanguages: ["en", "tr"],
  defaultLanguage: "en",
  localeSubpaths,
  localePath: resolve("./public/locales"),
});
