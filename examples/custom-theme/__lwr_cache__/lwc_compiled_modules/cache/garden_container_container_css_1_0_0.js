function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "background-color: hsl(var(--_garden-container-background));font-family: var(--_garden-font-family);}.container" + shadowSelector + " {padding: 24px;}p" + shadowSelector + " {text-align: center;padding: 24vh 0;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet];