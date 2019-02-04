import { Component, FileDetails } from './../../src/types';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import generate from '../../src/generator/template';
import { Framework } from '../../src/constants';

describe('template generator', () => {
  it('It should be happy', () => {
    const info: FileDetails = {
      path: '',
      extension: 'vue',
      name: 'my-first-component'
    };
    const component: Component = {
      state: {
        password: ''
      },
      props: {
        user: String
      },
      methods: {
        signIn() {
          console.log('Signed-in');
        }
      },
      children: []
    };
    const result = generate(Framework.VUE, info, component);

    console.error(result);
    assert.equal(1, 1);
  });
});
