import { Component, FileProperties } from './../types';
export default {
  parse: (path: string) => {
    const conponent: Component = {
      state: {},
      props: {},
      methods: {},
      children: [],
      fileProperties: {
        name: '',
        path: '',
        extension: 'ts'
      }
    };
    return conponent;
  },
  generate: function generate(component: Component) {
    return '';
  }
};
