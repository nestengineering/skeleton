const path = require("path");
const fs = require("fs");
const os = require("os");
import { describe, it } from "mocha";
import { assert } from "chai";
import parser from "../../src/parser";

const VUE = `<template>
<div>
  <header><slot name="header" /></header>
  <div><slot /></div>
</div>
</template>

<script>
const Login = 'src/components/Login.vue';

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



describe.only("test", () => {
  it("case1", () => {
    const tmp = path.resolve(os.tmpdir(), "skeleton_test/src/components");
    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/alice.vue`, VUE);
    const a = parser.parseVue(`${tmp}/alice.vue`);
    console.log(JSON.stringify(a));
    assert.equal(6, 6);
  });
});
