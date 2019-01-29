export interface State {
  [key: string]: any;
}

export interface Props {
  [key: string]: any;
}

export interface Component {
  state?: State;
  props?: Props;
  methods?: { [key: string]: () => any };
  template?: Array<any>; // TODO templateは一旦スルーして、どのようにするか決める必要がある 2019/01/30
}
