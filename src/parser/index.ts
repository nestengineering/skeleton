import { Component, FileProperties } from './../types';
import { Framework } from '../constants';
import VueLogic from '../logics/vue';
import ReactLogic from '../logics/react';
import AngularLogic from '../logics/angular';

const handleParsers: {
  [framework in Framework]: (filePath: string) => Component
} = {
  [Framework.VUE]: VueLogic.parse,
  [Framework.REACT]: ReactLogic.parse,
  [Framework.ANGULAR]: AngularLogic.parse
};

/**
 * Parses values from React, Vue, or Angular framework file
 *
 * @param framework Target framework
 * @param path File path
 * @return Parsed values
 */
export const parse = (framework: Framework, path: string): Component =>
  handleParsers[framework](path);
