<template>
<div>
  <div></div>
  <slot name="header"/>
</div>
</template>

<script>
export default {
data() {
  return {
    isEditing: "",
  };
},
props: {
  value: String,
},
methods: {
  changeValue() {}
},
components: {
}
};
</script>

<style lang="scss" scoped>
</style>