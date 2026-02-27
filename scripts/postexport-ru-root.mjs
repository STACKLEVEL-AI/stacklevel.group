import { copyFileSync, cpSync, existsSync, rmSync } from "fs";
import { join } from "path";

const outDir = join(process.cwd(), "out");
const ruDir = join(outDir, "ru");
const cnameSrc = join(process.cwd(), "CNAME");
const cnameDst = join(outDir, "CNAME");

if (!existsSync(outDir)) {
  process.exit(0);
}

if (existsSync(ruDir)) {
  // Copy Russian pages to root for canonical access (but keep ru/ folder too)
  cpSync(ruDir, outDir, { recursive: true, force: true });

  // Remove duplicate ru.html/ru.txt at root (keep the ru/ folder)
  rmSync(join(outDir, "ru.html"), { force: true });
  rmSync(join(outDir, "ru.txt"), { force: true });
}

// Preserve GitHub Pages custom domain configuration in deploy artifact.
if (existsSync(cnameSrc)) {
  copyFileSync(cnameSrc, cnameDst);
}
