import { readFileSync } from 'fs';

/**
 * Parse from vue file
 *
 * @param {string} path File path
 * @return {object} Parsed values
 */
function parse(path: string): Vue {
  const regex = /(<script>(.|\n|\r)*<\/script>)/;
  const file = readFileSync(path).toString();
  const [scriptTemplate] = file.split(regex).filter(str => regex.test(str));

  const vueObj = scriptTemplate
    .substring(8, scriptTemplate.length - 9) // Remove the <script></script> tag
    .split(/^export default/g)
    .join()
    .replace(/export default/, 'return');

  return new Function(vueObj)();
}

export default parse;
