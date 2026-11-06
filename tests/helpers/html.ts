// Read Astro's built HTML without starting a browser or adding a DOM library.
function text(value: string) {
  const entities: Record<string, string> = {
    amp: "&",
    apos: "'",
    quot: '"',
    lt: "<",
    gt: ">",
  };
  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|apos|quot|lt|gt);/gi,
    (_, entity: string) => {
      if (entity.startsWith("#")) {
        const hex = entity[1].toLowerCase() === "x";
        return String.fromCodePoint(
          parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10),
        );
      }
      return entities[entity.toLowerCase()];
    },
  );
}

function elements(html: string, tag: "html" | "meta" | "link" | "script") {
  return Array.from(
    html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "gi")),
    ([, attributes]) =>
      Object.fromEntries(
        Array.from(
          attributes.matchAll(
            /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g,
          ),
          ([, name, doubleQuoted, singleQuoted, unquoted]): [
            string,
            string,
          ] => [
            name.toLowerCase(),
            text(doubleQuoted ?? singleQuoted ?? unquoted),
          ],
        ),
      ),
  );
}

export function readHtml(html: string) {
  const document = html.replace(/<!--[\s\S]*?-->/g, "");
  const head = document.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  return {
    lang: elements(document, "html")[0]?.lang,
    titles: Array.from(
      head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi),
      ([, title]) => text(title),
    ),
    meta: elements(head, "meta"),
    links: elements(head, "link"),
    scripts: elements(document, "script").length,
  };
}
