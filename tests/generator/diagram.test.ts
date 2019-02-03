import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
// import * as opener from 'opener';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Component } from '../../src/types';
import diagram from '../../src/generator/diagram';

describe('diagram generator', () => {
  it('should return diagram html file', () => {
    const componets: Component = {
      state: {
        users: []
      },
      methods: {
        getUsers: () => {},
        updateUserName: () => {}
      },
      props: {},
      children: [
        {
          state: { isEditing: false },
          props: {
            user: {},
            updateUserName: () => {}
          },
          methods: {},
          children: [
            {
              state: {},
              props: { label: '', handleClick: () => {} },
              methods: {},
              children: []
            },
            {
              state: {},
              props: { value: '', handleChange: () => {} },
              methods: {},
              children: []
            }
          ]
        }
      ]
    };
    const result = diagram(componets);
    const tmp = path.resolve(os.tmpdir(), 'skeleton_test/src/components');
    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/diagram.html`, result);
    // opener(tmp + '/diagram.html');
    assert.exists(result, 'diagramResult is neither `null` nor `undefined`');
  });
});
