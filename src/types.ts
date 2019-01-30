export interface State {
  readonly [key: string]: any;
}

export interface Props {
  readonly [key: string]: any;
}

export interface Component {
  readonly state: State;
  readonly props: Props;
  readonly methods: { [key: string]: () => any };
  readonly template: any[]; // TODO templateは一旦スルーして、どのようにするか決める必要がある 2019/01/30
}

export interface Vue {
  data?: () => { readonly [key: string]: any };
  props?: { readonly [key: string]: any };
  methods?: { readonly [key: string]: () => any };
  components?: { readonly [key: string]: Vue };
}
