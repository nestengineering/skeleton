import { readFileSync } from 'fs';
import { Vue } from './interfaces';

/**
 * Parse from vue file
 *
 * @param {string} path File path
 * @return {any} Parsed values
 */
const parseVue = (path: string) => {
  const regex = /(<script>(.|\n|\r)*<\/script>)/;
  const file = readFileSync(path).toString();
  const [scriptTemplate] = file.split(regex).filter(str => regex.test(str));

  const vueObjTemplate = scriptTemplate
    .substring(8, scriptTemplate.length - 9) // Remove the <script></script> tag
    .split(/export default/g)
    .filter(str => !/import.+("|').*("|').*/.test(str)); // Remove import statements

  return vueObjTemplate;
};

const parseReact = () => {};

const parseAngular = () => {};

export default {
  parseVue,
  parseReact,
  parseAngular,
};
