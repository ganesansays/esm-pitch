#!/usr/bin/env node
/**
 * Set the site access password.
 * Usage: node scripts/set-password.mjs "your-new-password"
 */
import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/set-password.mjs "your-password"');
  process.exit(1);
}

const hash = createHash("sha256").update(password).digest("hex");
const configPath = join(dirname(fileURLToPath(import.meta.url)), "..", "js", "auth-config.js");

await writeFile(
  configPath,
  `// SHA-256 hash of your site password. Change via: node scripts/set-password.mjs "your-password"\nwindow.AUTH_CONFIG = {\n  passwordHash: "${hash}",\n};\n`,
  "utf8"
);

console.log("Password updated in js/auth-config.js");
