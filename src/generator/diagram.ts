import { readFileSync } from 'fs';
import { Component } from './../types';

const replacer = (k, v) => (typeof v === 'function' ? v.toString() : v);

export default (data: Component) => {
  const file = readFileSync(require.resolve('./assets/diagram.html'))
    .toString()
    .replace(/'SKELETON_DATA'/g, JSON.stringify(data, replacer));
  return file;
};
