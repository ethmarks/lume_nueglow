# lume_nueglow

Lume plugin that adds syntax highlighting with Nueglow

## Quickstart

```ts
// _config.ts
import lume from "https://cdn.jsdelivr.net/gh/lumeland/lume/mod.ts";
import nueglow from "https://cdn.jsdelivr.net/gh/ethmarks/lume_nueglow/mod.ts";

const site = lume();

site.use(nueglow());

export default site;
```

```html
<!-- index.vto -->
<p>Rendered Output:</p>
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

![Screenshot of a Javascript fibonacci function highlighted with a dark theme](./.github/quickstart_screenshot.png)
