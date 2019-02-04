import { Component, ComponentInfo } from './../../src/types';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { generate } from '../../src/generator/template';
import { Framework } from '../../src/constants';

describe('template generator', () => {
  it('It should be happy', () => {
    const info: ComponentInfo = {
      path: '',
      extension: 'vue',
      name: 'my-first-component'
    };
    const component: Component = {
      state: {},
      props: {},
      methods: {},
      children: []
    };
    generate(Framework.VUE, info, component);
    assert.equal(1, 1);
  });
});
