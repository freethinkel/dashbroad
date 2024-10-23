import type { Rect } from "@/shared/types";

export class SettingsStoreHelpers {
  protected _keysToShortcut(keys: string[]) {
    return keys
      .map(
        (char) =>
          ({
            Meta: "CommandOrControl",
            " ": "Space",
          }[char] || char)
      )
      .join("+");
  }

  protected _getDefaultStatusbarIconPosition(): Rect {
    return {
      y: (screen.height - screen.availHeight) * devicePixelRatio,
      x: (screen.availWidth - 450) * devicePixelRatio,
      width: 10,
      height: 10,
    };
  }
}
