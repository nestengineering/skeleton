import * as path from 'path';
import * as fs from 'fs';
import { Component, ComponentInfo } from './../types';
import { Framework } from '../constants';

const vueGenerator = (component: Component): string => {
  return 'Hello world';
};

const selectGenerator = (
  framework: Framework
): ((component: Component) => string) => {
  return {
    [Framework.VUE]: vueGenerator,
    [Framework.REACT]: vueGenerator,
    [Framework.ANGULAR]: vueGenerator
  }[framework];
};

const writeFile = (template: ComponentInfo & { content: string }) => {
  const output = path.resolve(
    require('os').homedir(),
    'Desktop/skeleton/src/',
    template.path
  );

  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(
    `${output}/${template.name}.${template.extension}`,
    template.content
  );
  console.log(output);
};

export default {
  createTemplate: (
    framework: Framework,
    component: Component & ComponentInfo
  ) => {
    const generator = selectGenerator(framework);
    const { name, path, extension } = { ...component };
    const content = generator(component);
    writeFile({ name, path, extension, content });
  }
};
