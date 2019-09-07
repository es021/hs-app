export function getMethods() {
  return {
    X(x1 = "", x2 = "", x3 = "", x4 = "", x5 = "", x6 = "", x7 = "", x8 = "") {
      try {
        x1 = JSON.parse(JSON.stringify(x1))
      } catch (err) {}
      try {
        x2 = JSON.parse(JSON.stringify(x2))
      } catch (err) {}
      try {
        x3 = JSON.parse(JSON.stringify(x3))
      } catch (err) {}
      try {
        x4 = JSON.parse(JSON.stringify(x4))
      } catch (err) {}
      try {
        x5 = JSON.parse(JSON.stringify(x5))
      } catch (err) {}
      try {
        x6 = JSON.parse(JSON.stringify(x6))
      } catch (err) {}
      try {
        x7 = JSON.parse(JSON.stringify(x7))
      } catch (err) {}
      try {
        x8 = JSON.parse(JSON.stringify(x8))
      } catch (err) {}

      let componentName = this.$vnode.tag;
      let arr = componentName.split("-");
      componentName = arr[arr.length - 1];
      console.log(`[${componentName}]`, x1, x2, x3, x4, x5, x6, x7, x8)
    }
  }
}
