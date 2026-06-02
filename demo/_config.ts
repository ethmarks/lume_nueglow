import lume from "lume/mod.ts";
import nueglow from "../mod.ts";

import markdown from "lume/plugins/markdown.ts";
import collapsiblePlugin from "npm:markdown-it-collapsible@^2.0.2";

const site = lume();

site.add("tufte.css");

site.use(nueglow({ numbered: true, css: "file" }));

site.use(markdown({
  plugins: [
    collapsiblePlugin,
  ],
}));

export default site;
