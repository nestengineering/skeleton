import { Component } from './../types';
export default {
  parse: (path: string) => {
    const conponent: Component = {
      state: {},
      props: {},
      methods: {},
      children: []
    };
    return conponent;
  },
  generate: function generate() {
    return '';
  }
};
