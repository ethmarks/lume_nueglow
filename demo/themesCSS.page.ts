import { THEMES } from "../mod.ts";

export const url = "/themes.css";

const themeCSS = Object.entries(THEMES).map((t) => {
  const name = t[0];
  const style = t[1];

  const selector = `[glow]:has([language="theme-${name}"])`;

  return style.replaceAll("[glow]", selector);
});

export const content = themeCSS.join("\n");
