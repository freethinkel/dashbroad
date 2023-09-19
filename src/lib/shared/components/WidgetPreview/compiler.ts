import * as svelteCompiler from "svelte/compiler";
import * as svelte from "svelte";
// @ts-ignore
import * as svelteInternal from "svelte/internal";
import * as svelteStore from "svelte/store";
import * as svelteMotion from "svelte/motion";
import * as svelteTransition from "svelte/transition";
import * as svelteEasing from "svelte/easing";
import * as svelteAnimate from "svelte/animate";

export const compile = async (
  source: string
): Promise<{ Component: typeof svelte.SvelteComponent; css: string }> => {
  const code = svelteCompiler.compile(source);
  const normalized = code.js.code
    .replace(/import {(\n*?|.*?)*?}/gim, (res) =>
      res.replace("import", "const")
    )
    .replace(
      /} from ".*"/gim,
      (res) => res.replace("} from ", "} = require(") + ")"
    )
    .replace('import "svelte/internal/disclose-version";', "")
    .replace("export default Component;", "return Component;");

  const require = (module: string) => {
    switch (module) {
      case "svelte":
        return svelte;
      case "svelte/internal":
        return svelteInternal;
      case "svelte/store":
        return svelteStore;
      case "svelte/motion":
        return svelteMotion;
      case "svelte/transition":
        return svelteTransition;
      case "svelte/easing":
        return svelteEasing;
      case "svelte/animate":
        return svelteAnimate;
      default:
        return {};
    }
  };
  const Component = Function("require", normalized)(require);

  return { Component, css: code.css.code };
};
