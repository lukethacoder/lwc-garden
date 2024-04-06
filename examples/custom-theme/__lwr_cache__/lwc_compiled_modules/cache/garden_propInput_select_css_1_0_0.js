import stylesheet0 from "./propInputShared.css";

function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return "select" + shadowSelector + " {width: 100%;background-color: transparent;color: hsl(var(--_garden-foreground));border-color: hsl(var(--_garden-input));border-width: var(--_garden-input-border-width);border-style: solid;border-radius: var(--_garden-input-border-radius);padding-block: 0;padding-inline: var(--_garden-input-padding-inline);line-height: var(--_garden-input-line-height);height: var(--_garden-input-height);font-size: var(--_garden-input-font-size);}option" + shadowSelector + " {background-color: hsl(var(--_garden-background));color: hsl(var(--_garden-foreground));}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet0, stylesheet];