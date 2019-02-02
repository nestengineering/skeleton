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
import Modal from "/src/pages/modal";
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
import Modal from "/src/pages/modal";
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

describe('vue parser', () => {
  it('should return parsed values', () => {
    const tmp = path.resolve(os.tmpdir(), 'skeleton_test/parser/src/components');
    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/alice.vue`, VUE_ALL);
    const parseResult = parser.convert(Framework.VUE, `${tmp}/alice.vue`);

    assert.exists(parseResult, 'parseResult is neither `null` nor `undefined`');
  });

  it('should return parsed values: template with no props nor state', () => {
    const tmp = path.resolve(os.tmpdir(), 'skeleton_test/parser/src/components');
    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/wonderland.vue`, VUE_NO_PROPS_AND_STATE);
    const parseResult = parser.convert(Framework.VUE, `${tmp}/wonderland.vue`);

    assert.exists(parseResult, 'parseResult is neither `null` nor `undefined`');
  });
});
