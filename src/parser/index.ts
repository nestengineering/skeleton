import { readFileSync } from 'fs';
import { Vue, Component } from './../types';

/**
 * Parse values from vue file
 *
 * @param {string} path File path
 * @return {Component} Parsed values
 */
const parseVue = (path: string): Component => {
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
    template: vueObj.components
      ? Object.entries(vueObj.components).map(([key, value]) => ({
          [key]: value,
        }))
      : [],
  };

  return component;
};

const parseReact = () => {};

const parseAngular = () => {};

export default {
  parseVue,
  parseReact,
  parseAngular,
};
