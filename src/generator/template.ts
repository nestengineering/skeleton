import * as path from 'path';
import * as fs from 'fs';
import VueLogic from '../logics/vue';
import ReactLogic from '../logics/react';
import AngularLogic from '../logics/angular';
import { Component, FileProperties } from './../types';
import { Framework } from '../constants';

const handleGenerators: {
  [framework in Framework]: (component: Component) => string
} = {
  [Framework.VUE]: VueLogic.generate,
  [Framework.REACT]: ReactLogic.generate,
  [Framework.ANGULAR]: AngularLogic.generate
};

const writeFile = (info: FileProperties, content: string) => {
  const output = path.resolve(
    require('os').homedir(),
    'Desktop/templates/',
    info.path
  );

  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(`${output}/${info.name}.${info.extension}`, content);
};

/**
 * Generate a framework template file starting from a Component
 *
 * @param framework Target framework
 * @param info Output file info
 * @param component Target component
 */
export default (
  framework: Framework,
  info: FileProperties,
  component: Component
) => writeFile(info, handleGenerators[framework](component));
