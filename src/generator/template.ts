import * as path from 'path';
import * as fs from 'fs';
import { Component, ComponentInfo } from './../types';
import { Framework } from '../constants';

const engines: {
  [framework in Framework]: { convert: (componet: Component) => string }
} = {
  [Framework.VUE]: { convert: (component: Component) => 'return' },
  [Framework.REACT]: { convert: (component: Component) => 'return' },
  [Framework.ANGULAR]: { convert: (component: Component) => 'return' }
};

const writeFile = (info: ComponentInfo, content: string) => {
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
const createTemplate = (
  framework: Framework,
  info: ComponentInfo,
  component: Component
) => writeFile(info, engines[framework].convert(component));

export default { createTemplate };
