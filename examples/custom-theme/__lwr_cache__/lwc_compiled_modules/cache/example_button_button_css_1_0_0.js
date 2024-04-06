function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return "button" + shadowSelector + " {border-radius: 8px;border: none;padding: 8px 12px;cursor: pointer;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet];