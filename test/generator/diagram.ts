import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as opener from 'opener';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Component } from '../../src/types';
import diagram from '../../src/generator/diagram';

// もはやアサートになっていないがいったん動作検証として残す
describe('diagram generator', () => {
  it('open diagram file', () => {
    const componets: Component = {
      state: {
        users: []
      },
      methods: {
        getUsers: () => {},
        updateUserName: () => {}
      },
      children: [
        {
          state: { isEditing: false },
          props: {
            user: {},
            updateUserName: () => {}
          },
          children: [
            {
              props: { label: '', handleClick: () => {} }
            },
            {
              props: { value: '', handleChange: () => {} }
            }
          ]
        }
      ]
    };
    const result = diagram(componets);
    const tmp = path.resolve(os.tmpdir(), 'skeleton_test/src/components');
    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/diagram.html`, result);
    opener(tmp + '/diagram.html');
    assert.exists(result, 'diagramResult is neither `null` nor `undefined`');
  });
});
