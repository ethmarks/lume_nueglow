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

## Languages

Nueglow supports every programming language because
[it uses heuristics rather than grammars](https://nuejs.org/docs/nueglow#:~:text=Language-agnostic,works%20across%20all%20programming%20languages.).
If it looks like code and uses code-y word like `if` and `return`, Nueglow can
highlight it.

Here are a bunch of example snippets from different programming languages.
Sourced from <https://github.com/uloco/syntax-highlighting-samples>.

[snippets]
