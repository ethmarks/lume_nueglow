/**
 * A few of the files from
 * https://github.com/uloco/syntax-highlighting-samples
 */
const snippetFiles = [
  "typescript.ts",
  "python.py",
  "ruby.rb",
  "kotlin.kt",
  "svelte.svelte",
  ".env",
  "bash.bash",
  "cpp.cpp",
  "css.css",
];

const snippetsPromises = await Promise.all(
  snippetFiles.map((file) =>
    fetch(
      `https://cdn.jsdelivr.net/gh/uloco/syntax-highlighting-samples/languages/${file}`,
    ).then((r) => r.text())
  ),
);

export const snippets = snippetFiles.map((file, i) => {
  return {
    name: file,
    ext: file.match(/\.([^/.]+)$/)![1],
    content: snippetsPromises[i],
  };
});
