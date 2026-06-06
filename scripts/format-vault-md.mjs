/**
 * Normaliza el markdown del vault: fences de código, listas, espaciado.
 * Usage: node scripts/format-vault-md.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VAULT_DIR = path.join(__dirname, '..', 'src', 'content', 'vault');

function formatBody(body) {
  let text = body;

  // ```bash: / ```#bash: / ```php: → idioma válido para Shiki
  text = text.replace(/```#?([\w+-]*):/g, '```$1');

  // Bloques sin idioma que parecen terminal → bash
  text = text.replace(
    /```\n((?:ng |npm |nmap |wfuzz |stty |script |export |xsltproc|reset )[^\n]+)\n```/g,
    '```bash\n$1\n```',
  );

  // Tab al inicio de párrafo → item de lista
  text = text.replace(/\n\t([^\n]+)/g, '\n\n- $1');

  // Líneas sueltas tipo "-oN -> desc" fuera de lista → bullet con negrita
  text = text.replace(
    /^(-[\w-]+)\s*->\s*(.+)$/gm,
    '- **$1** — $2',
  );

  // Normalizar saltos: máximo 2 líneas vacías
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

function formatFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return false;

  const frontmatter = match[1];
  const body = formatBody(match[2]);
  fs.writeFileSync(filePath, `---\n${frontmatter}\n---\n\n${body}\n`, 'utf8');
  return true;
}

function walk(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) count += walk(full);
    else if (entry.name.endsWith('.md') && formatFile(full)) count++;
  }
  return count;
}

const n = walk(VAULT_DIR);
console.log(`Formateados: ${n} archivos en src/content/vault/`);
