---
layout: layout.vto
---

# Lume Nueglow Plugin Demo

This is a [Lume](https://lume.land) plugin to add support for
[Nueglow](https://nuejs.org/docs/nueglow).

For example, here's a quickstart, highlighted with Nueglow via this plugin.

```ts
// _config.ts
import lume from "https://cdn.jsdelivr.net/gh/lumeland/lume/mod.ts";
import nueglow from "https://cdn.jsdelivr.net/gh/ethmarks/lume_nueglow/mod.ts";

const site = lume();

site.use(nueglow());

export default site;
```

```html
// index.vto
<pre>
  <code class="language-js">
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}
  </code>
</pre>
```

## Themes

The biggest advantage of Nueglow is that it's very easy to create custom themes.
Rather than
[massive JSON files](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json),
Nueglow themes consist of only a handful of CSS custom properties:

```css
[glow] {
  --glow-bg-color: #111729;
  --glow-font-color: #f0fbf9;
  --glow-primary-color: #8fdfd4;
  --glow-secondary-color: #aae7de;
  --glow-accent-color: #69cebf;
  --glow-special-color: #c5f0e9;
  --glow-base-color: #52b8a9;
  --glow-char-color: #3ca294;
  --glow-comment-color: #4a6360;
  --glow-counter-color: #2b7a6f;
  --glow-selected-color: #8fdfd426;
}
```

The example above is a [Catppuccin](https://catppuccin.com/)-inspired theme,
which you can see below:

```theme-catppuccin
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

It's also easy to create themes that complement a brand color. For example, if
your brand color is `#8FDFD4`, then you can create a monochromatic theme that
uses different shades of your brand color:

```theme-mint
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

Here's a theme that I created by lazily combining random pastel colors:

```theme-rainbow
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

_The CSS for all the themes above is available at [/themes.css](themes.css)._

## Special Syntax

Nueglow has some [special syntax](https://nuejs.org/docs/syntax-highlighting)
for drawing attention to specific selections and lines.

If you wrap a selection in single bullet markers (e.g. `•text•`), Nueglow will
surround it in `<mark>` tags. For example, look `fibonacci(num - 1)` is
highlighted in the example below.

```ts
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return •fibonacci(num - 1)• + fibonacci(num - 2);
}
```

If you wrap a selection in double bullet markers (e.g. `••text••`), Nueglow will
wrap it in `<u>` tags. This is typically used for drawing attention to errors.
For example, look how `num = 1` is underlined in the example below.

```ts
function fibonacci(num: number): number {
  if (••num = 1••) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

If you prefix a line with a greater than sign (`>`), Nueglow will wrap the whole
line in `<dfn>` tags. For example, look how the `return` line is highlighted in
the example below.

```ts
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
> return fibonacci(num - 1) + fibonacci(num - 2);
}
```

If you prefix a line with a minus sign (`-`) or plus sign (`+`), Nueglow will
wrap the whole line in `<del>` or `<ins>` tags, respectively. For example, look
at the diff below.

```ts
function fibonacci(num: number): number {
  if (num == 1) return 0;
  if (num == 2) return 1;
- return fibonacci(num - 1) + fibonacci(num - 2);
+ const minusOneFib = fibonacci(num - 1);
+ const minusTwoFib = fibonacci(num - 2);
+ return minusOneFib + minusTwoFib;
}
```

## Languages

Nueglow supports every programming language because
[it uses heuristics rather than grammars](https://nuejs.org/docs/nueglow#:~:text=Language-agnostic,works%20across%20all%20programming%20languages.).
If it looks like code and uses code-y words like `if` and `return`, Nueglow can
highlight it.

Here are a bunch of example snippets from different programming languages.

[snippets]

_Snippets are from the official [Nueglow demo](https://nuejs.org/glow-demo/),
the source of which is available here:
<https://github.com/nuejs/nue/blob/master/packages/nueglow/test/generate.js>._
