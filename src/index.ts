import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as opener from 'opener';
import { parse } from './parser/index';
import generator from './generator/index';
import { Framework } from './constants';

export default class {
  inputFW: Framework;

  constructor(input: Framework) {
    this.inputFW = input;
  }

  getDiagram(filePath: string) {
    const parseResult = parse(Framework.VUE, filePath);
    const html = generator.generateDiagram(parseResult);
    const tmp = path.resolve(os.tmpdir(), 'skeleton');
    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/diagram.html`, html);
    opener(tmp + '/diagram.html');
  }
}
