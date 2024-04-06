function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "width: 100%;--_garden-input-height: 36px;--_garden-input-padding-block: 4px;--_garden-input-padding-inline: 12px;--_garden-input-border-radius: calc(var(--_garden-radius) - 2px);--_garden-input-border-width: 1px;--_garden-input-line-height: 20;--_garden-input-font-size: 14px;}.field" + shadowSelector + " {display: grid;grid-template-columns: var(--_garden-props-grid-template-columns);color: hsl(var(--_garden-foreground));gap: 6px;}@media (min-width: 768px) {.field" + shadowSelector + " {gap: 0px;}}label" + shadowSelector + ",\r.label" + shadowSelector + " {font-size: 14px;text-overflow: ellipsis;overflow: hidden;}:is(input, select):focus-visible" + shadowSelector + " {outline: 2px solid hsl(var(--_garden-ring));}input" + shadowSelector + " {accent-color: hsl(var(--_garden-primary));}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet];