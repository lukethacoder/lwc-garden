function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "height: 100%;padding: 24px;display: flex;justify-content: center;align-items: center;}p" + shadowSelector + " {margin: 0;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet];