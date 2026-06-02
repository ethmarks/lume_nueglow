import { THEMES } from "../mod.ts";

export const url = "/themes.css";

const themeCSS = THEMES.map((t) => {
  const selector = `[glow]:has([language="theme-${t.name}"])`;

  return t.css.replaceAll("[glow]", selector);
});

export const content = themeCSS.join("\n");
