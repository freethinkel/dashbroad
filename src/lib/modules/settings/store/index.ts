import { activateWindow } from "@/shared/helpers";
import { persistendStorage } from "@/shared/store";
import type { Rect } from "@/shared/types";
import { globalShortcut } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";
import { atom } from "nanostores";
import { SettingsStoreHelpers } from "./SettingsStoreHelpers";

class SettingsStore extends SettingsStoreHelpers {
  isPinned = persistendStorage("is_pinned", false);
  isSettingsOpened = atom(false);
  activationMapping = persistendStorage<string[]>("activation_mapping", []);
  lastActivePosition = atom<Rect | null>(null);

  constructor() {
    super();
    this.activationMapping.subscribe(async (mapping) => {
      await globalShortcut.unregisterAll();
      if (mapping.length) {
        globalShortcut.register(
          this._keysToShortcut(mapping as string[]),
          () => {
            const position: Rect =
              this.lastActivePosition.get() ||
              this._getDefaultStatusbarIconPosition();

            this.toggleWindow(position);
          }
        );
      }
    });
  }

  async toggleWindow(position: Rect) {
    const isVisible = await appWindow.isVisible();
    if (isVisible) {
      appWindow.hide();
      settings$.isSettingsOpened.set(false);
    } else {
      activateWindow(position);
    }
  }

  togglePinned() {
    this.isPinned.set(!this.isPinned.get());
  }
  toggleSettingsPage() {
    this.isSettingsOpened.set(!this.isSettingsOpened.get());
  }

  setActivationMapping(keys: string[]) {
    this.activationMapping.set(keys);
  }
}

export const settings$ = new SettingsStore();
