// tslint:disable-next-line:import-name
import crawler from './crawler/index';
// tslint:disable-next-line:import-name
import parser from './parser/index';

class Skeleton {
  getGraph() {
    this.crawl();
    this.parse();
  }
  getAbstractModel() {
    this.crawl();
    this.parse();
  }
  private crawl() {
    crawler();
  }
  private parse() {
    parser();
  }
}

const a = new Skeleton();
a.getAbstractModel();
a.getGraph();
