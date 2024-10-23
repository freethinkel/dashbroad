import type { Palette } from "../types";
import { transparentize } from "polished";
import { computed } from "nanostores";
import { CORE_THEMES } from "./core-themes";
import { persistendStorage } from "@/shared/store";

class ThemeStore {
  theme = persistendStorage("theme", CORE_THEMES[0].name);
  currentPalette = computed(
    this.theme,
    (name) =>
      CORE_THEMES.find((palette) => palette.name === name) || CORE_THEMES[0]
  );

  private opacify(color: string, opacity: number) {
    return transparentize(1 - opacity, color);
  }

  private generateStylesFromPalette(palette: Palette): string {
    return `
  :root {
    --color-background: ${palette.background};
    --color-foreground: ${palette.foreground};
    --color-black: ${palette.black};
    --color-red: ${palette.red};
    --color-green: ${palette.green};
    --color-yellow: ${palette.yellow};
    --color-blue: ${palette.blue};
    --color-magenta: ${palette.magenta};
    --color-cyan: ${palette.cyan};
    --color-white: ${palette.white};
  }
`;
  }
  watchAndGeneratePalette() {
    const style = document.createElement("style");
    document.head.appendChild(style);

    this.currentPalette.subscribe((palette) => {
      style.innerHTML = this.generateStylesFromPalette(palette);
    });
  }
}

const theme$ = new ThemeStore();

export { CORE_THEMES, theme$ };
