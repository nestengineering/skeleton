import crawler from './crawler/index';
import parser from './parser/index';

export default class {
  getGraph() {
    return this.parse();
  }
  getAbstractModel() {
    return this.crawl();
  }
  private crawl() {
    return crawler();
  }
  private parse() {
    return parser();
  }
}
