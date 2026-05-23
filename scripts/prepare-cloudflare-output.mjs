import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";

const outputDir = "out";

const routeCopies = [
  ["tr", ""],
  ["tr/hakkimizda", "hakkimizda"],
  ["tr/hizmetlerimiz", "hizmetlerimiz"],
  ["tr/iletisim", "iletisim"],
  ["en", "en"],
  ["en/hakkimizda", "en/about"],
  ["en/hizmetlerimiz", "en/services"],
  ["en/iletisim", "en/contact"],
];

function ensureDirectory(path) {
  mkdirSync(path, { recursive: true });
}

function copyIfExists(source, target) {
  if (!existsSync(source)) {
    return;
  }

  ensureDirectory(dirname(target));
  copyFileSync(source, target);
}

function copyRouteFiles(sourceRoute, targetRoute) {
  const sourceBase = join(outputDir, sourceRoute);
  const targetBase = join(outputDir, targetRoute);

  copyIfExists(`${sourceBase}.html`, join(targetBase, "index.html"));

  if (targetRoute) {
    copyIfExists(`${sourceBase}.html`, `${targetBase}.html`);
    copyIfExists(`${sourceBase}.txt`, `${targetBase}.txt`);
  }

  if (!existsSync(sourceBase) || !statSync(sourceBase).isDirectory()) {
    return;
  }

  ensureDirectory(targetBase);

  for (const entry of readdirSync(sourceBase)) {
    const source = join(sourceBase, entry);

    if (!statSync(source).isFile() || !entry.endsWith(".txt")) {
      continue;
    }

    copyFileSync(source, join(targetBase, entry));
  }
}

for (const [sourceRoute, targetRoute] of routeCopies) {
  copyRouteFiles(sourceRoute, targetRoute);
}
