/**
 * Lightweight Markdown → HTML renderer. No external dependencies.
 *
 * Handles: headings, bold, italic, inline code, fenced code blocks,
 * blockquotes, tables, unordered/ordered lists, horizontal rules, links.
 *
 * @param {string} md  Raw markdown string
 * @returns {string}   Safe-ish HTML string (wrap in dangerouslySetInnerHTML)
 */
export function renderMarkdown(md) {
  let html = md;

  // Escape helper
  const escapeHTML = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 1. Escape raw HTML entities
  html = escapeHTML(html);

  // 2. Fenced code blocks ```lang\n...\n```
  html = html.replace(
    /```(\w*)\n?([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="md-pre"><code class="md-code${lang ? ` language-${lang}` : ""}">${escapeHTML(code.trim())}</code></pre>`
  );

  // 3. Blockquotes > text
  html = html.replace(/^&gt; (.+)$/gm, `<blockquote class="md-bq">$1</blockquote>`);

  // 4. Headings
  html = html.replace(/^### (.+)$/gm, `<h3 class="md-h3">$1</h3>`);
  html = html.replace(/^## (.+)$/gm, `<h2 class="md-h2">$1</h2>`);
  html = html.replace(/^# (.+)$/gm, `<h1 class="md-h1">$1</h1>`);

  // 5. Horizontal rule
  html = html.replace(/^---$/gm, `<hr class="md-hr" />`);

  // 6. Tables
  html = html.replace(
    /(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)*)/g,
    (table) => {
      const rows = table.trim().split("\n");
      const header = rows[0]
        .split("|")
        .filter(Boolean)
        .map((c) => `<th class="md-th">${c.trim()}</th>`)
        .join("");
      const body = rows
        .slice(2)
        .map(
          (row) =>
            `<tr>${row
              .split("|")
              .filter(Boolean)
              .map((c) => `<td class="md-td">${c.trim()}</td>`)
              .join("")}</tr>`
        )
        .join("");
      return `<table class="md-table"><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
    }
  );

  // 7. Unordered lists - or *
  html = html.replace(/((?:^[-*] .+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => `<li class="md-li">${l.replace(/^[-*] /, "")}</li>`)
      .join("");
    return `<ul class="md-ul">${items}</ul>`;
  });

  // 8. Ordered lists 1. item
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => `<li class="md-li">${l.replace(/^\d+\. /, "")}</li>`)
      .join("");
    return `<ol class="md-ol">${items}</ol>`;
  });

  // 9. Inline code `code`
  html = html.replace(/`([^`]+)`/g, `<code class="md-inline-code">$1</code>`);

  // 10. Bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // 11. Italic *text*
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // 12. Links [label](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    `<a class="md-link" href="$2" target="_blank" rel="noopener noreferrer">$1</a>`
  );

  // 13. Auto-links (optional)
  html = html.replace(
    /(https?:\/\/[^\s<]+)/g,
    `<a class="md-link" href="$1" target="_blank" rel="noopener noreferrer">$1</a>`
  );

  // 14. Paragraphs
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (/^<(h[1-6]|ul|ol|pre|blockquote|table|hr)/.test(block)) return block;
      return `<p class="md-p">${block.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}