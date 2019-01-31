import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import parser from '../../src/parser';
import { Framework } from '../../src/constants';

const VUE = `<template>
<div>
  <header><slot name="header" /></header>
  <div><slot /></div>
</div>
</template>

<script>
import Login from '/src/login';
import * as Logout from 'src/login';
import { Person, Force } from 'src/logs';

export default {
data(){
    return {
        hello:'world'
    }
},
props: {
    world: String
},
methods: {
    bark(){

    }
},
components: {
  Login
}
};
</script>

<style>
</style>`;

describe('vue parser', () => {
  it('should return parsed values', () => {
    const tmp = path.resolve(os.tmpdir(), 'skeleton_test/src/components');
    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/alice.vue`, VUE);
    const parseResult = parser.convert(Framework.VUE, `${tmp}/alice.vue`);

    assert.exists(parseResult, 'parseResult is neither `null` nor `undefined`');
  });
});
