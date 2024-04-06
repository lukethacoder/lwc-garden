import stylesheet0 from "./propInputShared.css";

function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ".field" + shadowSelector + " span" + shadowSelector + " {display: flex;align-items: flex-start;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet0, stylesheet];