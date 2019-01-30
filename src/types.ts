export interface State {
  readonly [key: string]: any;
}

export interface Props {
  readonly [key: string]: any;
}

export interface Component {
  readonly state?: State;
  readonly props?: Props;
  readonly methods?: { [key: string]: () => any };
  readonly template?: Array<any>; // TODO templateは一旦スルーして、どのようにするか決める必要がある 2019/01/30
}
