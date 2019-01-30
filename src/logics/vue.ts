export default {
  isComponent: (filePath: string): boolean => {
    const ext = /^.+\.([^.]+)$/.exec(filePath);
    return ext == null ? false : ext[1] === "vue";
  }
};
