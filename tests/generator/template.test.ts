import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Component, FileProperties } from './../../src/types';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import generate from '../../src/generator/template';
import { Framework } from '../../src/constants';

const SRC = 'skeleton_test/parser/src';
const ASSETS_VUE = '../test-assets/vue';

describe('template generator', () => {
  it('It should generate a Vue file', () => {
    const componentsTmp = path.resolve(os.tmpdir(), `${SRC}/components`);
    const component: Component = {
      state: {
        password: ''
      },
      props: {
        user: String
      },
      methods: {
        signIn() {},
        signOut() {}
      },
      children: [
        {
          state: {},
          props: {},
          methods: {},
          children: [],
          fileProperties: {
            name: 'Model',
            path: 'src/model/Model.vue',
            extension: 'vue'
          }
        },
        {
          state: {},
          props: {},
          methods: {},
          children: [],
          fileProperties: {
            name: 'Model2',
            path: 'src/model/Model2.vue',
            extension: 'vue'
          }
        }
      ],
      fileProperties: {
        path: '',
        extension: 'vue',
        name: 'CompoentWithChildren'
      }
    };

    // ファイル生成
    generate(
      { framework: Framework.VUE, outputDirectory: componentsTmp },
      component
    );

    const result = fs
      .readFileSync(
        require.resolve(
          `${componentsTmp}/${component.fileProperties.path}/${
            component.fileProperties.name
          }.vue`
        )
      )
      .toString();

    console.log(result);
    assert.equal(
      result,
      '<template></template>\n<script>\nimport Model from "src/model/Model.vue";\nimport Model2 from "src/model/Model2.vue";\n\nexport default {\n  data() {\n    return { password: \'\' }\n  },\n  props: { user: String },\n  methods: { signIn: function signIn() { },signOut: function signOut() { } },\n  components: {\n    Model,Model2\n  }\n};\n</script>\n'
    );
  });
});
