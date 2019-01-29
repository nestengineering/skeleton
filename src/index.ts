import crawler from "./crawler/index";
import parser from "./parser/index";
import { Framework } from "./constants";

export default class {
  input: Framework;
  constructor(input: Framework) {
    this.input = input;
  }
  getAbstractModel(startDir) {
    // MEMO イメージ的にはこんな感じ？
    // return this.crawl(startDir).map(file => this.parse(file))
    return this.crawl(startDir);
  }
  private crawl(startDir: string): string[] {
    return crawler(startDir, this.input);
  }
  private parse() {
    return parser();
  }
}
