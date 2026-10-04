// Собирает index.html (полная страница для GitHub Pages) из блока для Tilda.
// Источник правды — mh-design-tilda-block.html. После правок блока запустите:  node build.mjs
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("./mh-design-tilda-block.html", import.meta.url), "utf8");

const links = src.match(/<link[^>]*>/g);
const style = src.match(/<style>[\s\S]*?<\/style>/);
const bodyStart = src.indexOf('<div class="mh" id="mh-top">');
if (!links || !style || bodyStart < 0) throw new Error("Не удалось разобрать mh-design-tilda-block.html");

const title = "MH Design — студия дизайна интерьеров";
const description = "Дизайн-студия «Modern Home» с 2005 года создаёт интерьеры и экстерьеры квартир, домов, офисов, бутиков и кафе. Дизайн, комплектация и организация работ под ключ.";
const ogImage = "https://static.tildacdn.com/tild6661-6135-4161-a235-336135663665/image.png";
const favicon = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#F7F3EE"/>' +
  '<text x="32" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#1D1915">M<tspan fill="#A9845A" font-style="italic">H</tspan></text></svg>'
);

const html = `<!doctype html>
<!-- Сгенерировано из mh-design-tilda-block.html скриптом build.mjs — правьте блок, а не этот файл. -->
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#F7F3EE">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">
  <link rel="icon" href="${favicon}">
  ${links.join("\n  ")}
  <style>html, body { margin: 0; padding: 0; background: #F7F3EE; } body { overflow-x: clip; }</style>
  ${style[0].replace(/\n/g, "\n  ")}
</head>
<body>
${src.slice(bodyStart).trim()}
</body>
</html>
`;

writeFileSync(new URL("./index.html", import.meta.url), html);
console.log("index.html собран:", (html.length / 1024).toFixed(1) + " КБ");
