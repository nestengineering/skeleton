import { readFileSync } from 'fs';
import { Vue, Component, FileProperties } from './../types';
import * as path from 'path';

export default {
  parse: function parse(filePath: string) {
    const regex = /(?<=<template>(\t|\n|\r|.)*<\/template>(\t|\n|\r|.)*)<script>(\t|\n|\r|.)*<\/script>/gm; // Look behind
    const file = readFileSync(filePath).toString();
    const scriptTemplate = file
      .match(regex)
      .join('')
      .trim();

    const template = scriptTemplate
      .substring('<script>'.length, scriptTemplate.length - '</script>'.length)
      .replace(/export default/, 'return')
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
        : [],
      fileProperties: {
        name: filePath
          .replace(/.*(\/|\\)(?=.*\.vue)/g, '')
          .replace(/.vue$/, ''),
        path: filePath.replace(/^(.*?)(?=src)/gm, ''),
        extension: 'vue'
      }
    };
    
    return component;
  },
  generate: function generate(component: Component) {
    const stringifyObject = (obj: {}) => {
      const str = Object.entries(obj)
        .map(([key, entry], index) => {
          switch (typeof entry) {
            case 'string':
              return `${key}: '${entry}'`;
            case 'function':
              return `${key}: function ${entry}`;
            case 'object':
              return stringifyObject(entry);
            default:
              return String(entry);
          }
        })
        .join();

      return `{ ${str} }`;
    };
    const stringifyEntries = (object: { [key: string]: Function }) => {
      const str = Object.entries(object)
        .map(([key, entry]) => `${key}: ${entry.name}`)
        .join();
      return `{ ${str} }`;
    };

    const state = stringifyObject(component.state);
    const props = stringifyEntries(component.props);
    const methods = stringifyObject(component.methods);
    const children = [];

    return `<template>
</template>
 <script>
    export default {
      data() {
        return ${state || '{}'}
      },
      props: ${props || '{}'},
      methods: ${methods || '{}'},
      components: {}
    }
 </script>
`;
  }
};
