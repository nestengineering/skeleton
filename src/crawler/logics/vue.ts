export default {
  isComponent: (filePath: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filePath);
    return ext == null ? false : ext[1] === "vue";
  }
};
