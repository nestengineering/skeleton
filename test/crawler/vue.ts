import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { describe, it } from "mocha";
import { assert } from "chai";
import crawler from "../../src/crawler";
import { Framework } from "../../src/constants";

describe("vue crawler", () => {
  it("should return vue files", () => {
    const tmp = path.resolve(os.tmpdir(), "skeleton_test/src/components");

    fs.mkdirSync(tmp, { recursive: true });
    fs.writeFileSync(`${tmp}/alice.vue`, "Im alice.vue"); // This is Vue🖖(1)
    fs.writeFileSync(`${tmp}/ace.js`, "Im ace.js");
    fs.writeFileSync(`${tmp}/apple.vue`, "Im apple.vue"); // This is Vue🖖(2)
    fs.writeFileSync(`${tmp}/ask.ts`, "Im ask.ts");

    fs.mkdirSync(`${tmp}/container`, { recursive: true });
    fs.writeFileSync(`${tmp}/container/bob.html`, "Im bob.html");
    fs.writeFileSync(`${tmp}/container/bar.js`, "Im bar.js");
    fs.writeFileSync(`${tmp}/container/baz.ts`, "Im baz.ts");
    fs.writeFileSync(`${tmp}/container/boy.vue`, "Im boy.vue"); // This is Vue🖖(3)

    fs.mkdirSync(`${tmp}/presentation/`, { recursive: true });
    fs.writeFileSync(`${tmp}/presentation/car.vue`, "Im car.vue"); // This is Vue🖖(4)
    fs.writeFileSync(`${tmp}/presentation/card.md`, "Im card.md");
    fs.writeFileSync(`${tmp}/presentation/cake.ts`, "Im cake.ts");

    const atoms = "presentation/atoms";
    fs.mkdirSync(`${tmp}/${atoms}`, { recursive: true });
    fs.writeFileSync(`${tmp}/${atoms}/atoms.jsx`, "Im atoms.jsx");
    fs.writeFileSync(`${tmp}/${atoms}/atoms`, "Im atoms");
    fs.writeFileSync(`${tmp}/${atoms}/atoms.vue`, "Im atoms.vue"); // This is Vue🖖(5)

    const molecules = "presentation/molecules";
    fs.mkdirSync(`${tmp}/${molecules}`, { recursive: true });
    fs.writeFileSync(`${tmp}/${molecules}/card.md`, "Im card.md");
    fs.writeFileSync(`${tmp}/${molecules}/cake.ts`, "Im cake.ts");
    fs.writeFileSync(`${tmp}/${molecules}/cup.jsx`, "Im cup.jsx");

    const organisms = "presentation/organisms";
    fs.mkdirSync(`${tmp}/${organisms}`, { recursive: true });
    fs.writeFileSync(`${tmp}/${organisms}/cpu`, "Im cpu");
    fs.writeFileSync(`${tmp}/${organisms}/car.vue`, "Im car.vue"); // This is Vue🖖(6)
    fs.writeFileSync(`${tmp}/${organisms}/card.md`, "Im card.md");
    console.log(JSON.stringify(crawler(tmp, Framework.VUE)))
    assert.equal(crawler(tmp, Framework.VUE).length, 6);

  });
});
