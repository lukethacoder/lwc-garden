import stylesheet0 from "./propInputShared.css";

function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return "input" + shadowSelector + " {border-color: hsl(var(--_garden-input));border-width: var(--_garden-input-border-width);border-style: solid;border-radius: var(--_garden-input-border-radius);appearance: none;-moz-appearance: none;-webkit-appearance: none;background: none;cursor: pointer;padding: 0;height: var(--_garden-input-height);width: calc(var(--_garden-input-height) * 3);max-width: 100%;}input" + shadowSelector + "::-webkit-color-swatch-wrapper {padding: 2px;}input" + shadowSelector + "::-webkit-color-swatch {border: 0;border-radius: calc(var(--_garden-input-border-radius) - 2px);}input" + shadowSelector + "::-moz-color-swatch,\rinput" + shadowSelector + "::-moz-focus-inner {border: 0;}input" + shadowSelector + "::-moz-focus-inner {padding: 0;}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet0, stylesheet];