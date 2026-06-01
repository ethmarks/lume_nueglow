/**
 * lume_nueglow is a Lume plugin that adds syntax highlighting with Nueglow.
 */
import { glow } from "npm:nue-glow@0.2.5";
import type { default as Site, Plugin } from "lume/core/site.ts";
import type { Page } from "lume/core/file.ts";

/** Plugin Options */
export interface Options {
  /**
   * The CSS output mode.
   *
   * * 'inline': Directly injects the nueglow styles into a <style> block in
   * the <head> of every page that uses nueglow.
   * * 'file': Writes the nueglow styles to a new file based on the 'cssPath'
   * plugin option. If you choose this option, remember that _you_, the plugin
   * user, are responsible for ensuring that every page that uses nueglow
   * imports this file.
   * * 'manual': Disables automatic CSS output. This lets you set your own
   * styles.
   * * false: Alias for 'manual'.
   *
   * Default is 'inline' to make the plugin plug-and-play, but I recommend
   * setting it to 'file' or 'manual' for performance and customizability.
   */
  css?: "inline" | "file" | "manual" | false;

  /**
   * The path to output the CSS file to if CSS output mode is 'file'.
   *
   * Default is '/glow.css'.
   */
  cssPath?: string;

  /**
   * Whether to minify the CSS.
   *
   * Default is true.
   */
  minifyCSS?: boolean;

  /**
   * The theme of the CSS.
   *
   * * 'dark': A dark theme sourced from
   * https://nuejs.org/glow-demo/dark.css.
   * * 'light': A light theme sourced from
   * https://github.com/nuejs/nue/blob/master/packages/nueglow/css/light.css.
   * * 'catppuccin': A dark theme made by me based on
   * https://catppuccin.com/palette/.
   * * 'none': No theme.
   */
  theme?: "dark" | "light" | "catppuccin" | "none";

  /**
   * Whether to enable line numbering.
   *
   * Default is false.
   */
  numbered?: boolean;

  /**
   * Whether to parse diff prefixes (+/-) and callouts (>) in nueglow.
   *
   * Default is true.
   */
  prefix?: boolean;

  /**
   * Whether to parse marking (•foo•) and highlighting (••foo••) in nueglow.
   *
   * Default is true.
   */
  mark?: boolean;
}

/**
 * Sourced from https://nuejs.org/glow-demo/glow.css.
 *
 * Pieces of an alternate version are available at
 * https://github.com/nuejs/nue/blob/master/packages/nueglow/css/syntax.css and
 * https://github.com/nuejs/nue/blob/master/packages/nueglow/css/markers.css.
 * However, they lack the ::before styles for <ins> and <del> tags.
 */
const GLOW_SYNTAX_CSS = `
  [glow] {
    background-color: var(--glow-bg-color);
    padding: var(--glow-padding);
    color:var(--glow-base-color);
    counter-reset:line-counter 0;
    font-family:monospace;
    line-height:1.7
  }
  [glow] code * {
    font-weight:400;
    font-style:inherit;
    text-decoration:inherit
  }
  [glow] b {
    color:var(--glow-primary-color)
  }
  [glow] em {
    color:var(--glow-secondary-color)
  }
  [glow] strong {
    color:var(--glow-accent-color)
  }
  [glow] i {
    color:var(--glow-char-color)
  }
  [glow] u {
    text-decoration:underline wavy var(--glow-error-color);
    text-underline-offset:.5em;
    text-decoration-thickness:.15em
  }
  [glow] sup {
    color:var(--glow-comment-color);
    font-size:inherit;
    vertical-align:inherit;
    font-style:italic
  }
  [glow] label {
    color:var(--glow-special-color);
    font-weight:700
  }
  [glow] mark {
    color:unset;
    background-color:var(--glow-selected-color);
    border-radius:.2em;
    margin:-.3em -.4em;
    padding:.3em .4em
  }
  [glow] span {
    counter-increment:line-counter 1
  }
  [glow] span:before {
    color:var(--glow-counter-color);
    content:counter(line-counter);
    text-align:right;
    width:2.5em;
    margin-right:1em;
    padding-right:1em;
    display:inline-block
  }
  [glow] span:has(u):before {
    background-color:var(--glow-error-color);
    color:#fff;
    border-radius:.2em;
    font-weight:700
  }
  [glow] {
    --glow-line-color:50,180,250;
    --glow-del-color:250,110,130;
    --glow-ins-color:50,210,190;
    --glow-line-opacity:.15;
    --glow-padding:1em
  }
  [glow] ins,
  [glow] del,
  [glow] dfn {
    min-width:calc(100% + calc(var(--glow-padding)*2));
    border-left:.2em solid #fff;
    width:100%;
    display:inline-block;
    position:relative
  }
  :is([glow] ins,
  [glow] del,
  [glow] dfn) :first-child {
    margin-left:-.2em
  }
  :is([glow] ins,
  [glow] del,
  [glow] dfn):before {
    left:calc(var(--glow-padding) + 2em);
    position:absolute
  }
  span :is([glow] ins,
  [glow] del,
  [glow] dfn) {
    margin-left:calc(-3.7em - var(--glow-padding));
    padding-left:calc(3.5em + var(--glow-padding))
  }
  [glow] ins {
    border-color:rgb(var(--glow-ins-color));
    background-color:rgba(var(--glow-ins-color),var(--glow-line-opacity))
  }
  [glow] ins:before {
    content:"+";
    color:rgb(var(--glow-ins-color))
  }
  [glow] del {
    border-color:rgb(var(--glow-del-color));
    background-color:rgba(var(--glow-del-color),var(--glow-line-opacity));
    border-radius:0
  }
  [glow] del:before {
    content:"-";
    color:rgb(var(--glow-del-color))
  }
  [glow] dfn {
    border-color:rgb(var(--glow-line-color));
    background-color:rgba(var(--glow-line-color),var(--glow-line-opacity))
  }
`;

/**
 * Themes that specify values for each of the the CSS Custom Properties that
 * Glow uses.
 */
const GLOW_THEMES = {
  /** https://nuejs.org/glow-demo/dark.css */
  dark: `[glow] {
  --glow-bg-color: #111729;
  --glow-font-color: #e2e8f0;
  --glow-primary-color: #7dd3fc;
  --glow-secondary-color: #f472b6;
  --glow-accent-color: #419fff;
  --glow-special-color: #fff;
  --glow-error-color: red;
  --glow-base-color: #a2aab1;
  --glow-char-color: #64748b;
  --glow-comment-color: #4e5d61;
  --glow-counter-color: #475569;
  --glow-selected-color: #2dd4bf26;
}`,

  /** https://github.com/nuejs/nue/blob/master/packages/nueglow/css/light.css */
  light: `[glow] {
  --glow-bg-color: #f9f9f9;
  --glow-base-color: #555;
  --glow-primary-color: #0068d6;
  --glow-secondary-color: #bd2864;
  --glow-accent-color: #456aff;
  --glow-special-color: #7820bc;
  --glow-error-color: red;
  --glow-char-color: #8e989c;
  --glow-comment-color: #9aa1a3;
  --glow-counter-color: #bbb;
  --glow-marked-color: #51c6fe29;
}`,

  /** Made by me based on https://catppuccin.com/palette/ */
  catppuccin: `[glow] {
    --glow-bg-color: #1e1e2e;
    --glow-font-color: #cdd6f4;
    --glow-primary-color: #89b4fa;
    --glow-secondary-color: #fab387;
    --glow-accent-color: #a6e3a1;
    --glow-special-color: #f5c2e7;
    --glow-error-color: red;
    --glow-base-color: #bac2de;
    --glow-char-color: #cba6f7;
    --glow-comment-color: #6c7086;
    --glow-counter-color: #f38ba8;
    --glow-selected-color: #585b7040;
}`,

  /** Empty string because we don't append any theming to the syntax styles. */
  none: "",
};

/** The default options */
const DEFAULT_OPTIONS: Options = {
  css: "inline",
  cssPath: "/glow.css",
  minifyCSS: true,
  theme: "dark",
  prefix: true,
  mark: true,
  numbered: false,
};

/**
 * Crudely minify CSS using regexes.
 *
 * This probably doesn't work in general, but because it'll only ever process
 * GLOW_SYNTAX_CSS and GLOW_THEMES, it should be fine.
 *
 * I considered using an actual minifier (e.g. lightning-css), but it would
 * just introduce complexity and dependencies for minimal (ba-dum-tss) benefit.
 */
function crudeMinify(text: string) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Single spaces
    .replace(/\s*([\{};:>+,])\s*/g, "$1") // Spaces around symbols
    .replace(/;(?=})/g, "") // Last semicolon
    .trim(); // Clean ends
}

/** a Lume plugin that adds syntax highlighting with Nueglow.  */
export default function (userOptions?: Options): Plugin {
  // Merge userOptions into DEFAULT_OPTIONS with a spread operator.
  const opt = { ...DEFAULT_OPTIONS, userOptions };

  return (site: Site) => {
    site.process([".html"], (pages: Page[]) => {
      for (const page of pages) {
        const { document } = page;
        if (!document) continue;

        const codeBlocks = document.querySelectorAll("pre > code");

        codeBlocks.forEach((element) => {
          const codeElement = element as unknown as HTMLElement;
          const preElement = codeElement.parentElement!;

          try {
            const langClass = Array.from(codeElement.classList).find((c) =>
              c.startsWith("language-")
            );
            const language = langClass?.replace("language-", "");

            preElement.setAttribute("glow", "");
            preElement.innerHTML = glow(codeElement.innerText, {
              language,
              prefix: opt.prefix,
              mark: opt.mark,
              numbered: opt.numbered,
            });
          } catch (error) {
            console.warn(`[nueglow] Error in ${page.sourcePath}`, error);
          }
        });
      }
    });

    const addCSS = opt.css !== "manual" && opt.css !== false;
    if (addCSS) {
      let cssText = GLOW_SYNTAX_CSS + GLOW_THEMES[opt.theme ?? "none"];

      if (opt.minifyCSS) {
        cssText = crudeMinify(cssText);
      }

      if (opt.css === "file") {
        // Put cssText in a new file at cssPath
        site.page({
          url: opt.cssPath,
          content: cssText,
        });
      } else if (opt.css === "inline") {
        // Put cssText in a <style> block in the <head> of every page that uses
        // glow.
        site.process([".html"], (pages) => {
          for (const page of pages) {
            if (page.document?.querySelector("[glow]")) {
              const style = page.document.createElement("style");
              style.textContent = cssText;
              page.document.head.appendChild(style);
            }
          }
        });
      }
    }
  };
}
