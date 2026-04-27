/**
 * Replace `{em}…{/em}` markers in copy with real `<em>` tags.
 * Escapes everything else so the result is safe to drop in via `set:html`.
 */
export function emify(input: string): string {
  return escapeHtml(input).replace(/\{em\}([\s\S]*?)\{\/em\}/g, "<em>$1</em>");
}

export function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
