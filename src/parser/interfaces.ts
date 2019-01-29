export interface Vue {
  data?: () => { readonly [key: string]: any };
  props?: { readonly [key: string]: any };
  methods?: { readonly [key: string]: () => any };
  components?: { readonly [key: string]: Vue };
}
