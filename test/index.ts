import { describe, it } from "mocha";
import { assert } from "chai"
const Skeleton = require("..");

const skeleton = new Skeleton();

describe("#getGraph()", () => {
  it("should return Im parser!", () => {
    assert.equal(skeleton.getGraph(), "Im parser!");
  });
});
describe("#getAbstractModel()", () => {
  it("should return Im crawler!", () => {
    assert.equal(skeleton.getAbstractModel(), "Im crawler!");
  });
});
