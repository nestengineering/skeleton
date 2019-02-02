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
  readonly children: Component[];
}
export interface ComponentInfo {
  name: string;
  path: string;
  extension: 'js' | 'ts' | 'vue' | 'html';
}
export interface Vue {
  data?: () => { readonly [key: string]: any };
  props?: { readonly [key: string]: any };
  methods?: { readonly [key: string]: () => any };
  components?: { readonly [key: string]: string };
}
