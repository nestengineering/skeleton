import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Component } from '../../src/types';
import diagram from '../../src/generator/diagram';

describe('diagram generator', () => {
  it('should return diagram html string', () => {
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
    assert.exists(result, 'diagramResult is neither `null` nor `undefined`');
  });
});
