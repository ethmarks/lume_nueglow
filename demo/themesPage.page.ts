import { THEMES } from "../mod.ts";

export const layout = "layout.vto";
export const url = "/themes.html";

export const css = `pre{border-radius: 0;}`;

const snippet = `function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}`;

const themeHTML = THEMES.map((theme) => {
  const langClass = `language-theme-${theme.name}`;
  const langComment = `// ${theme.name} theme ${
    theme.name === "dark" ? "(default)" : ""
  }`;
  const attrComment = `// by ${theme.attribution}`;
  return `<pre><code class="${langClass}">
${langComment}
${attrComment}
${snippet}
</code></pre>`;
}).join("\n");

export const content = `
<h1>Themes</h1>
<div class="themes">
${themeHTML}
</div>
`;
