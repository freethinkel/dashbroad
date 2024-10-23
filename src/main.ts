import { settings$ } from "@/modules/settings";
import "./styles.css";
import App from "@/core/app/App.svelte";
import { theme$ } from "@/modules/theme/store";
import type { Rect } from "@/shared/types";
import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import { plugins$ } from "@/modules/plugins";

const app = new App({
  target: document.getElementById("app")!,
});

theme$.watchAndGeneratePalette();
plugins$.init();

appWindow.onFocusChanged((event) => {
  if (!event.payload && !settings$.isPinned.get()) {
    appWindow.hide();
    settings$.isSettingsOpened.set(false);
  }
});

listen("on_statusbar_click", async ({ payload }) => {
  const position = payload as Rect;

  settings$.lastActivePosition.set(position);
  settings$.toggleWindow(position);
});

export default app;
