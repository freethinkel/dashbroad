import type { Palette } from "../types";
import Color from "colorjs.io";
import { atom } from "nanostores";

const currentPalette = atom<Palette>({
  primary: "#002b36",
  accent: "#6c71c4",
  text: "#eee8d5",
});

const generateStylesFromPalette = (palette: Palette): string => {
  const primary = new Color(palette.primary);
  const text = new Color(palette.text);

  const shadow = text.clone();
  shadow.alpha = 0.03;

  const border = text.clone();
  border.alpha = 0.08;

  const card = primary.clone();
  card.lch.l += 7;

  return `
  :root {
    --color-primary: ${primary};
    --color-text: ${text};
    --color-card: ${card};
    --color-border: ${border};
    --shadow1: 0 3px 10px 0 ${shadow};
  }
`;
};

export const watchAndGeneratePallete = () => {
  const style = document.createElement("style");
  document.head.appendChild(style);

  currentPalette.subscribe((palette) => {
    style.innerHTML = generateStylesFromPalette(palette);
  });
};
