---
layout: layout.vto
---

# Lume Nueglow Plugin Demo

This is a [Lume](https://lume.land) plugin to add support for
[Nueglow](https://nuejs.org/docs/nueglow).

For example, here's the
[left-pad](https://en.wikipedia.org/wiki/Npm_left-pad_incident) code,
highlighted with Nueglow via this plugin.

```js
module.exports = leftpad;

function leftpad(str, len, ch) {
  str = String(str);

  var i = -1;

  ch || (ch = " ");
  len = len - str.length;

  while (++i < len) {
    str = ch + str;
  }

  return str;
}
```

## Themes

The biggest advantage of Nueglow is that it's very easy to create custom themes.
Rather than
[massive JSON files](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json),
Nueglow themes only consist of a handful of CSS custom properties:

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
// user interface
interface User { name: string;  id: number; }

// account interface
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

It's also easy to create themes that complement a brand color. For example, if
your brand color is [mint], then you can create a monochromatic theme that uses
different shades of your brand color:

```theme-mint
// user interface
interface User { name: string;  id: number; }

// account interface
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

Here's a theme that I created by lazily combining random pastel colors:

```theme-rainbow
// user interface
interface User { name: string;  id: number; }

// account interface
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

_The CSS for all the themes above is available at [/themes.css](themes.css)._

## Languages

Nueglow supports every programming language because
[it uses heuristics rather than grammars](https://nuejs.org/docs/nueglow#:~:text=Language-agnostic,works%20across%20all%20programming%20languages.).
If it looks like code and uses code-y word like `if` and `return`, Nueglow can
highlight it.

Here are a bunch of example snippets from different programming languages.

[snippets]

_Snippets are from the official [Nueglow demo](https://nuejs.org/glow-demo/),
the source of which is available here:
<https://github.com/nuejs/nue/blob/master/packages/nueglow/test/generate.js>._
