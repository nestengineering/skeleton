<template>
<div>
  <div></div>
  <slot name="header"/>
</div>
</template>

<script>
import Modal from "../parts/modal.vue";
import * as Parser from "src/util/parser";
import { User, UserDetails } from "src/interfaces";

export default {
data() {
  return {
    username: "",
    password: ""
  };
},
props: {
  token: String,
  id: Number
},
methods: {
  signIn() {
    const parser = Parser;
  },
  signOut() {}
},
components: {
  Modal
}
};
</script>

<style lang="scss" scoped>
</style>