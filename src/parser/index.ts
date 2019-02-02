import { readFileSync } from 'fs';
import * as path from 'path';
import { Vue, Component } from './../types';
import { Framework } from '../constants';

const parsers: { [framework in Framework]: (filePath: string) => Component } = {
  [Framework.VUE]: (filePath: string) => {
    console.log(filePath);
    const regex = /(<script>(.|\n|\r)*<\/script>)/;
    const file = readFileSync(filePath).toString();
    const [scriptTemplate] = file.split(regex).filter(str => regex.test(str));

    const vueObjTemplate = scriptTemplate
      .substring('<script>'.length, scriptTemplate.length - '</script>'.length)
      .replace(/export default/g, 'return')
      .replace(/import\s?\*?\s?(as)?{?(?=\s.*('|").*('|");)/g, 'let')
      .replace(/\s?}?\s?from(?=\s?('|").*('|");)/g, ' =');

    const vueObj: Vue = new Function(vueObjTemplate)();
    const component: Component = {
      state: vueObj.data ? vueObj.data() : {},
      props: vueObj.props ? vueObj.props : {},
      methods: vueObj.methods ? vueObj.methods : {},
      children: vueObj.components
        ? Object.entries(vueObj.components).map(([key, relPath]) => {
            console.log(relPath);
            return parsers[Framework.VUE](
              path.resolve(filePath.match(/.*(?=\/.*\.vue)/g).join(), relPath)
            );
          })
        : []
    };

    return component;
  },
  [Framework.REACT]: (path: string) => {
    const conponent: Component = {
      state: {},
      props: {},
      methods: {},
      children: []
    };
    return conponent;
  },
  [Framework.ANGULAR]: (path: string) => {
    const conponent: Component = {
      state: {},
      props: {},
      methods: {},
      children: []
    };
    return conponent;
  }
};

/**
 * Parse values from vue a specific framework
 *
 * @param framework Target framework
 * @param path File path
 * @return Parsed values
 */
const convert = (framework: Framework, path: string): Component =>
  parsers[framework](path);

export default { convert };
