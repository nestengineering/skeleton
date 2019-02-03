import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { readFileSync } from 'fs';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import Skeleton from '../../src/index';
import { Framework } from '../../src/constants';

const SRC = 'skeleton_test/parser/src';
const ASSETS_VUE = '../test-assets/vue';

describe.skip('skeleton', () => {
  it('should open diagram', () => {
    const componentsTmp = path.resolve(os.tmpdir(), `${SRC}/components`);
    const partsTmp = path.resolve(os.tmpdir(), `${SRC}/parts`);
    fs.mkdirSync(componentsTmp, { recursive: true });
    fs.mkdirSync(partsTmp, { recursive: true });
    fs.writeFileSync(
      `${componentsTmp}/FullData.vue`,
      readFileSync(require.resolve(`${ASSETS_VUE}/FullData.vue`)).toString()
    );
    fs.writeFileSync(
      `${partsTmp}/Model.vue`,
      readFileSync(require.resolve(`${ASSETS_VUE}/Model.vue`)).toString()
    );
    const skeleton = new Skeleton(Framework.VUE);
    skeleton.getDiagram(`${componentsTmp}/FullData.vue`);
  });
});
