import { Component } from './../types';
import { diagramHtml } from './assets/diagram';

const replacer = (k, v) => (typeof v === 'function' ? v.toString() : v);

export default (data: Component) => {
  const file = diagramHtml.replace(
    /'SKELETON_DATA'/g,
    JSON.stringify(data, replacer)
  );
  return file;
};
