function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ".sr-only" + shadowSelector + " {position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0, 0, 0, 0);white-space: nowrap;border-width: 0;}*" + shadowSelector + " {scrollbar-width: auto;scrollbar-color: hsl(var(--_garden-primary)) hsl(var(--_garden-muted));}*" + shadowSelector + "::-webkit-scrollbar {width: 12px;}*" + shadowSelector + "::-webkit-scrollbar-track {background: hsl(var(--_garden-muted));}*" + shadowSelector + "::-webkit-scrollbar-thumb {background-color: hsl(var(--_garden-primary));border-radius: 10px;border: 2px solid hsl(var(--_garden-muted));}";
  /*LWC compiler v6.5.0*/
}
export default [stylesheet];