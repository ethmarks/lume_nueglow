import lume from "lume/mod.ts";
import theme from "theme/mod.ts";

const site = lume({
  location: new URL("https://ethmarks.github.io/lume_nueglow/"),
});

site.add("demo.css");

site.use(theme({ nueglow: { numbered: true, theme: "dark" } }));

export default site;
