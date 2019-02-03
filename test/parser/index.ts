import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import parser from '../../src/parser';
import { Framework } from '../../src/constants';

const VUE_ALL = `<template>
<div>
  <div></div>
  <slot name="header"/>
</div>
</template>

<script>
import Modal from "../parts/modal.vue";
import * as Parser from "src/util/parser";
import { User, UserDetails } from "src/interfaces";

export default {
data() {
  return {
    username: "",
    password: ""
  };
},
props: {
  token: String,
  id: Number
},
methods: {
  signIn() {
    const parser = Parser;
  },
  signOut() {}
},
components: {
  Modal
}
};
</script>

<style lang="scss" scoped>
</style>`;

const VUE_NO_PROPS_AND_STATE = `<template>
<div>
  <div></div>
  <slot name="header"/>
</div>
</template>

<script>
import Modal from "../parts/modal.vue";
import * as Parser from "src/util/parser";
import { User, UserDetails } from "src/interfaces";

export default {
data() {
  return {
  };
},
methods: {
  signIn() {
    const parser = Parser;
  },
  signOut() {}
},
components: {
  Modal
}
};
</script>

<style lang="scss" scoped>
</style>`;

const VUE_MODAL = `<template>
<div>
  <div></div>
  <slot name="header"/>
</div>
</template>

<script>
export default {
data() {
  return {
    isEditing: "",
  };
},
props: {
  value: String,
},
methods: {
  changeValue() {}
},
components: {
}
};
</script>

<style lang="scss" scoped>
</style>`;

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
    fs.writeFileSync(`${componentsTmp}/alice.vue`, VUE_ALL);
    fs.writeFileSync(`${partsTmp}/modal.vue`, VUE_MODAL);
    const parseResult = parser.convert(
      Framework.VUE,
      `${componentsTmp}/alice.vue`
    );
    assert.deepEqual(parseResult.state, { username: '', password: '' });
    assert.deepEqual(parseResult.props, { token: String, id: Number });
    assert.isFunction(parseResult.methods.signIn);
    assert.isFunction(parseResult.methods.signOut);
    assert.notExists(parseResult.methods.hoge);
    assert(parseResult.children.length, 1);
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
    fs.writeFileSync(`${componentsTmp}/wonderland.vue`, VUE_NO_PROPS_AND_STATE);
    fs.writeFileSync(`${partsTmp}/modal.vue`, VUE_MODAL);
    const parseResult = parser.convert(
      Framework.VUE,
      `${componentsTmp}/wonderland.vue`
    );

    assert.deepEqual(parseResult.state, {});
    assert.deepEqual(parseResult.props, {});
    assert.isFunction(parseResult.methods.signIn);
    assert.isFunction(parseResult.methods.signOut);
    assert.notExists(parseResult.methods.hoge);
    assert(parseResult.children.length, 1);
    assert.deepEqual(parseResult.children[0].state, { isEditing: '' });
    assert.deepEqual(parseResult.children[0].props, { value: String });
    assert.isFunction(parseResult.children[0].methods.changeValue);
    assert.notExists(parseResult.children[0].methods.hoge);
  });
});
