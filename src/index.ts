import crawler from "./crawler/index";
import parser from "./parser/index";
import { Framework } from "./constants";

export default class {
  inputFW: Framework;
  constructor(input: Framework) {
    this.inputFW = input;
  }
  getAbstractModel(startDir) {
    // MEMO イメージ的にはこんな感じ？
    // return this.crawl(startDir).map(file => this.parse(file))
    return this.crawl(startDir);
  }
  private crawl(startDir: string): string[] {
    return crawler(startDir, this.inputFW);
  }
  private parse() {
    return parser();
  }
}
