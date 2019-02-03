import { readFileSync } from 'fs';
import * as path from 'path';
import { Vue, Component } from './../types';
import { Framework } from '../constants';

const parsers: { [framework in Framework]: (filePath: string) => Component } = {
  [Framework.VUE]: (filePath: string) => {
    const regex = /(<script>(.|\n|\r)*<\/script>)/;
    const file = readFileSync(filePath).toString();
    const [scriptTemplate] = file.split(regex).filter(str => regex.test(str));

    const template = scriptTemplate
      .substring('<script>'.length, scriptTemplate.length - '</script>'.length)
      .replace(/export default/g, 'return')
      .replace(/import\s?\*?\s?(as)?{?(?=\s.*('|").*('|");)/g, 'let')
      .replace(/\s?}?\s?from(?=\s?('|").*('|");)/g, ' =');

    const vue: Vue = new Function(template)();
    const component: Component = {
      state: vue.data ? vue.data() : {},
      props: vue.props ? vue.props : {},
      methods: vue.methods ? vue.methods : {},
      children: vue.components
        ? Object.entries(vue.components).map(([key, relPath]) =>
            parsers[Framework.VUE](
              path.resolve(filePath.match(/.*(?=\/.*\.vue)/g).join(), relPath)
            )
          )
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
 * Parses values from React, Vue, or Angualar framework file
 *
 * @param framework Target framework
 * @param path File path
 * @return Parsed values
 */
const convert = (framework: Framework, path: string): Component =>
  parsers[framework](path);

export default { convert };
