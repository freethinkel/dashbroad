import "./styles.css";
import App from "./App.svelte";
import { watchAndGeneratePallete } from "@/modules/theme/store";
import type { Rect } from "@/shared/types";
import { listen } from "@tauri-apps/api/event";
import {
  LogicalSize,
  PhysicalPosition,
  appWindow,
} from "@tauri-apps/api/window";

const app = new App({
  target: document.getElementById("app")!,
});

watchAndGeneratePallete();

const SIZE = { height: 600, width: 400 };

appWindow.onFocusChanged((event) => {
  // if (!event.payload) {
  //   appWindow.hide();
  // }
});

listen("on_statusbar_click", async ({ payload }) => {
  const position = payload as Rect;

  const isVisible = await appWindow.isVisible();
  if (isVisible) {
    appWindow.hide();
  } else {
    await appWindow.setPosition(
      new PhysicalPosition(
        position.x -
          (SIZE.width / 2) * (await appWindow.scaleFactor()) +
          position.width / 2,
        position.y + 10
      )
    );
    await appWindow.setSize(new LogicalSize(SIZE.width, SIZE.height));
    // await updateFrameSizeFx();
    appWindow.show();
    appWindow.setFocus();
  }
});

export default app;
