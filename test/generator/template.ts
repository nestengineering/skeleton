import { Component, ComponentInfo } from './../../src/types';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import generator from '../../src/generator/template';
import { Framework } from '../../src/constants';

describe('template generator', () => {
  it('It should be happy', () => {
    const component: Component & ComponentInfo = {
      state: {},
      props: {},
      methods: {},
      templates: [],
      path: '',
      extension: 'vue',
      name: 'my-first-component'
    };
    generator.createTemplate(Framework.VUE, component);

    assert(1, 1);
  });
});
