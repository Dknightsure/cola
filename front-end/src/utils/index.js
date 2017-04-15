export default {
  clone: (obj) => {
    const tmp = JSON.stringify(obj);
    return JSON.parse(tmp);
  }
}