import { readFileSync } from 'fs';
import { Vue, Component } from './../types';
import { Framework } from '../constants';

const parsers: { [framework in Framework]: (path: string) => Component } = {
  [Framework.VUE]: (path: string) => {
    const regex = /(<script>(.|\n|\r)*<\/script>)/;
    const file = readFileSync(path).toString();
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
        ? Object.entries(vueObj.components).map(([key, value]) => ({
            [key]: value
          }))
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
