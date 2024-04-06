function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return "div" + shadowSelector + " {display: flex;flex-direction: column;gap: 8px;}slot" + shadowSelector + " {display: flex;padding: 8px;border: 1px solid burlywood;}.slot-container" + shadowSelector + " {display: flex;flex-direction: column;gap: 4px;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet];