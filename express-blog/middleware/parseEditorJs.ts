import edjsHTML from "editorjs-html";

interface EditorJsBlock {
  type: string;
  data: Record<string, any>;
}

interface EditorJsContent {
  time: number;
  blocks: EditorJsBlock[];
  version: string;
}

const customParsers = {
  header: (block: EditorJsBlock) => {
    const level = block.data.level;
    const text = block.data.text || "";
    return `<h${level} class="blog-heading blog-heading-${level}">${text}</h${level}>`;
  },

  paragraph: (block: EditorJsBlock) => {
    const text = block.data.text || "";
    return `<p class="blog-paragraph">${text}</p>`;
  },

  list: (block: EditorJsBlock) => {
    const tag = block.data.style === "unordered" ? "ul" : "ol";

    const renderItems = (items: (string | { content: string; items?: any[] })[]): string =>
      items
        .map((item) => {
          if (typeof item === "string") return `<li>${item}</li>`;
          return `<li>${item.content}${item.items ? renderItems(item.items) : ""}</li>`;
        })
        .join("");

    return `<${tag} class="blog-list blog-list-${block.data.style}">${renderItems(block.data.items)}</${tag}>`;
  },

  image: (block: EditorJsBlock) => {
    const url = block.data.file?.url || "";
    const caption = block.data.caption || "";
    return `<figure class="blog-image">
      <img src="${url}" alt="${caption}">
      ${caption ? `<figcaption>${caption}</figcaption>` : ""}
    </figure>`;
  },

  delimiter: () => `<hr class="blog-delimiter" />`,

  quote: (block: EditorJsBlock) => {
    const text = block.data.text || "";
    const caption = block.data.caption || "";
    return `<blockquote class="blog-quote">
      <p>${text}</p>
      ${caption ? `<footer>— ${caption}</footer>` : ""}
    </blockquote>`;
  },

  code: (block: EditorJsBlock) => {
    const code = block.data.code || "";
    return `<pre class="blog-code"><code>${code}</code></pre>`;
  },

  embed: (block: EditorJsBlock) => {
    const embed = block.data.embed || "";
    const width = block.data.width || 640;
    const height = block.data.height || 360;
    const caption = block.data.caption || "";
    return `<div class="blog-embed">
      <iframe src="${embed}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>
      ${caption ? `<p class="blog-embed-caption">${caption}</p>` : ""}
    </div>`;
  },
};

const edjsParser = edjsHTML(customParsers);

export function parseEditorJs(content?: EditorJsContent): string {
  if (!content) return "";
  const parsed = edjsParser.parse(content);
  return parsed
}
