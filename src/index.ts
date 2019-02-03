import { parse } from './parser/index';
import generator from './generator/index';
import { Framework } from './constants';

export default class {
  inputFW: Framework;
  constructor(input: Framework) {
    this.inputFW = input;
  }
}
