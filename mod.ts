/**
 * lume_nueglow is a Lume plugin that adds syntax highlighting with Nueglow
 */

/** Options that specify how to handle nueglow's CSS and how to  */
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
   * The theme of the CSS.
   *
   * * 'dark': A dark theme sourced from https://nuejs.org/glow-demo/dark.css.
   * * 'light': A light theme sourced from https://github.com/nuejs/nue/blob/master/packages/nueglow/css/light.css.
   * * 'min': No theme.
   */
  theme?: "dark" | "light" | "min";

  /**
   * Whether to parse diff prefixes (+/-) and callouts (>) in neuglow.
   */
  prefix?: boolean;

  /**
   * Whether to parse marking (•foo•) and highlighting (••foo••) in neuglow.
   */
  mark?: boolean;
}
