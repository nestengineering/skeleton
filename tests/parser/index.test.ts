import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { readFileSync } from 'fs';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import parser from '../../src/parser';
import { Framework } from '../../src/constants';

describe('vue parser', () => {
  it('should return parsed values', () => {
    const componentsTmp = path.resolve(
      os.tmpdir(),
      'skeleton_test/parser/src/components'
    );
    const partsTmp = path.resolve(
      os.tmpdir(),
      'skeleton_test/parser/src/parts'
    );
    fs.mkdirSync(componentsTmp, { recursive: true });
    fs.mkdirSync(partsTmp, { recursive: true });
    fs.writeFileSync(
      `${componentsTmp}/alice.vue`,
      readFileSync(require.resolve('../test-assets/vue/FullData.vue')).toString()
    );
    fs.writeFileSync(
      `${partsTmp}/modal.vue`,
      readFileSync(require.resolve('../test-assets/vue/Model.vue')).toString()
    );
    const parseResult = parser.convert(
      Framework.VUE,
      `${componentsTmp}/alice.vue`
    );
    assert.deepEqual(parseResult.state, { username: '', password: '' });
    assert.deepEqual(parseResult.props, { token: String, id: Number });
    assert.isFunction(parseResult.methods.signIn);
    assert.isFunction(parseResult.methods.signOut);
    assert.notExists(parseResult.methods.hoge);
    assert.equal(parseResult.children.length, 1);
    assert.deepEqual(parseResult.children[0].state, { isEditing: '' });
    assert.deepEqual(parseResult.children[0].props, { value: String });
    assert.isFunction(parseResult.children[0].methods.changeValue);
    assert.notExists(parseResult.children[0].methods.hoge);
  });

  it('should return parsed values: template with no props nor state', () => {
    const componentsTmp = path.resolve(
      os.tmpdir(),
      'skeleton_test/parser/src/components'
    );
    const partsTmp = path.resolve(
      os.tmpdir(),
      'skeleton_test/parser/src/parts'
    );
    fs.mkdirSync(componentsTmp, { recursive: true });
    fs.mkdirSync(partsTmp, { recursive: true });
    fs.writeFileSync(
      `${componentsTmp}/wonderland.vue`,
      readFileSync(
        require.resolve('../test-assets/vue/NoPropsAndState.vue')
      ).toString()
    );
    fs.writeFileSync(
      `${partsTmp}/modal.vue`,
      readFileSync(require.resolve('../test-assets/vue/Model.vue')).toString()
    );
    const parseResult = parser.convert(
      Framework.VUE,
      `${componentsTmp}/wonderland.vue`
    );

    assert.deepEqual(parseResult.state, {});
    assert.deepEqual(parseResult.props, {});
    assert.isFunction(parseResult.methods.signIn);
    assert.isFunction(parseResult.methods.signOut);
    assert.notExists(parseResult.methods.hoge);
    assert.equal(parseResult.children.length, 1);
    assert.deepEqual(parseResult.children[0].state, { isEditing: '' });
    assert.deepEqual(parseResult.children[0].props, { value: String });
    assert.isFunction(parseResult.children[0].methods.changeValue);
    assert.notExists(parseResult.children[0].methods.hoge);
  });
});
