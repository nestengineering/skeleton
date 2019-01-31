import * as path from 'path';
import * as fs from 'fs';
import { Component, ComponentInfo } from './../types';
import { Framework } from '../constants';

const engine = (
  framework: Framework,
  component: Component
): { toString: () => string } =>
  ({
    [Framework.VUE]: { toString: () => 'Hello world' },
    [Framework.REACT]: { toString: () => 'Hello world' },
    [Framework.ANGULAR]: { toString: () => 'Hello world' }
  }[framework]);

const writeFile = (info: ComponentInfo, content: string) => {
  const output = path.resolve(
    require('os').homedir(),
    'Desktop/templates/',
    info.path
  );

  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(`${output}/${info.name}.${info.extension}`, content);
};

const createTemplate = (
  framework: Framework,
  info: ComponentInfo,
  component: Component
) => writeFile(info, engine(framework, component).toString());

export default { createTemplate };
