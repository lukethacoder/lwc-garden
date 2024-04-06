import stylesheet0 from "./propInputShared.css";

function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return "[role='fieldset']" + shadowSelector + " {border: none;padding: 0;margin: 0;}.options" + shadowSelector + " {display: flex;}[data-type='radio']" + shadowSelector + " .options" + shadowSelector + " {flex-direction: column;}[data-type='inline-radio']" + shadowSelector + " .options" + shadowSelector + " {flex-direction: row;flex-wrap: wrap;}.options" + shadowSelector + " label" + shadowSelector + " {padding: 4px 0;display: flex;cursor: pointer;}.options" + shadowSelector + " > span" + shadowSelector + " {display: flex;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet0, stylesheet];