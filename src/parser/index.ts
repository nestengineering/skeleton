import { readFileSync } from 'fs';
import { Vue } from './interfaces';
/**
 * Parse from vue file
 *
 * @param {string} path File path
 * @return {Vue} Parsed values
 */
function parse(path: string): any {
  const regex = /(<script>(.|\n|\r)*<\/script>)/;
  const file = readFileSync(path).toString();
  const [scriptTemplate] = file.split(regex).filter(str => regex.test(str));

  const vueObjTemplate = scriptTemplate
    .substring(8, scriptTemplate.length - 9) // Remove the <script></script> tag
    .split(/^export default/g)
    .join()
    .replace(/export default/, 'return');

  const vueObj: Vue = new Function(vueObjTemplate)();
  return vueObj;
}

export default parse;
