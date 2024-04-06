function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: flex;width: 100%;}pre" + shadowSelector + " {display: flex;background-color: #121212;color: #fff;width: 100%;max-height: 100%;overflow: auto;padding: 12px;border-width: 2px;border-style: solid;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet];