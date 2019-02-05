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

const writeFile = (
  properties: FileProperties & { outputDirectory?: string },
  content: string
) => {
  const directory =
    properties.outputDirectory ||
    path.resolve(
      require('os').homedir(),
      'Desktop/templates/',
      properties.path
    );
  fs.mkdirSync(properties.outputDirectory, { recursive: true });
  fs.writeFileSync(
    `${directory}/${properties.name}.${properties.extension}`,
    content
  );
};

/**
 * Generate a framework template file starting from a Component
 *
 * @param properties Target framework, output directory etc...
 * @param component Target component
 */
export default (
  properties: { framework: Framework; outputDirectory?: string },
  component: Component
) =>
  writeFile(
    {
      outputDirectory: properties.outputDirectory,
      ...component.fileProperties
    },
    handleGenerators[properties.framework](component)
  );
