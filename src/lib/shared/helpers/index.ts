import {
  LogicalSize,
  PhysicalPosition,
  appWindow,
} from "@tauri-apps/api/window";
import type { Rect } from "../types";

const SIZE = { height: 600, width: 400 };

export const activateWindow = async (position: Rect) => {
  await appWindow.setPosition(
    new PhysicalPosition(
      position.x -
        (SIZE.width / 2) * (await appWindow.scaleFactor()) +
        position.width / 2,
      position.y + 10
    )
  );
  document.body.style.height = "auto";
  const computedHeight = document.body.clientHeight;
  if (computedHeight < SIZE.height) {
    document.body.style.height = "100vh";
  }
  await appWindow.setSize(
    new LogicalSize(SIZE.width, Math.min(computedHeight, SIZE.height))
  );
  // await updateFrameSizeFx();
  appWindow.show();
  appWindow.setFocus();
};
