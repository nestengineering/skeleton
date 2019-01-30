import { readFileSync } from "fs";
import { Vue } from "./interfaces";

/**
 * Parse from vue file
 *
 * @param {string} path File path
 * @return {any} Parsed values
 */
const parseVue = (path: string): Vue => {
  const regex = /(<script>(.|\n|\r)*<\/script>)/;
  const file = readFileSync(path).toString();
  const [scriptTemplate] = file.split(regex).filter(str => regex.test(str));

  const vueObjTemplate = scriptTemplate
    .substring('<script>'.length, scriptTemplate.length - '</script>'.length)
    .replace(/export default/g, "return");
  return new Function(vueObjTemplate)();
};

const parseReact = () => {};

const parseAngular = () => {};

export default {
  parseVue,
  parseReact,
  parseAngular
};
