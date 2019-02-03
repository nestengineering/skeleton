import { readFileSync } from 'fs';
import { Vue, Component } from './../types';
import * as path from 'path';
export default {
  parse: function parse (filePath: string) {
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
            parse(
              path.resolve(filePath.match(/.*(?=\/.*\.vue)/g).join(), relPath)
            )
          )
        : []
    };
    return component;
  }
};
