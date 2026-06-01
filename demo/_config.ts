import lume from "lume/mod.ts";
import nueglow from "../mod.ts";

const site = lume();

site.use(nueglow());

export default site;
