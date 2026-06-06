/**
 * Import Obsidian notes into src/content/vault with sanitization and image handling.
 *
 * SOLO importa los 20 apuntes seleccionados en el Explorador de archivos (2 capturas).
 * Borra cualquier otro .md del vault antes de importar.
 *
 * Usage: node scripts/import-vault-notes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = String.raw`C:\Users\andy_\OneDrive\Escritorio\Mis apuntes\Mis Apuntes`;
const IMGS_SOURCE = path.join(SOURCE_DIR, 'imgs');
const VAULT_DIR = path.join(ROOT, 'src', 'content', 'vault');
const IMGS_DEST = path.join(ROOT, 'public', 'vault-imgs');

/** @type {{ src: string; dest: string; title: string; description?: string; tags: string[]; date?: string }[]} */
const NOTES = [
  {
    src: 'Investigación de firewall Palo Alto.md',
    dest: 'seguridad/investigacion-firewall-palo-alto.md',
    title: 'Investigación de firewall Palo Alto',
    tags: ['firewall', 'palo-alto', 'seguridad'],
    date: '2023-02-23',
  },
  {
    src: 'Máquina RootMe TryHackme.md',
    dest: 'pentesting/maquina-rootme-tryhackme.md',
    title: 'Máquina RootMe — TryHackMe',
    description: 'Writeup de la máquina RootMe en TryHackMe.',
    tags: ['tryhackme', 'pentesting', 'ctf'],
    date: '2023-05-05',
  },
  {
    src: 'Máquina Source TryHackMe.md',
    dest: 'pentesting/maquina-source-tryhackme.md',
    title: 'Máquina Source — TryHackMe',
    tags: ['tryhackme', 'pentesting', 'ctf'],
    date: '2023-05-01',
  },
  {
    src: 'Mi primer apunte.md',
    dest: 'general/mi-primer-apunte-obsidian.md',
    title: 'Mi primer apunte — Obsidian',
    description: 'Notas sobre formato markdown, imágenes y embeds en Obsidian.',
    tags: ['obsidian', 'markdown'],
    date: '2023-05-01',
  },
  {
    src: 'Migración cuenta de outlook a cuenta de google workspace.md',
    dest: 'infra/migracion-outlook-google-workspace.md',
    title: 'Migración Outlook → Google Workspace',
    tags: ['google-workspace', 'migración', 'email'],
    date: '2025-08-22',
  },
  {
    src: 'nmap.md',
    dest: 'pentesting/nmap.md',
    title: 'nmap — Comandos útiles',
    tags: ['nmap', 'pentesting', 'recon'],
    date: '2023-05-01',
  },
  {
    src: 'Organización de seguridad de cuentas.md',
    dest: 'aws/organizacion-seguridad-cuentas.md',
    title: 'Organización de seguridad de cuentas AWS',
    description: 'GuardDuty, AWS Config, Security Hub y Firewall Manager explicados.',
    tags: ['aws', 'seguridad', 'guardduty'],
    date: '2023-08-17',
  },
  {
    src: 'Primer reto.md',
    dest: 'pentesting/primer-reto-lab.md',
    title: 'Primer reto — Laboratorio',
    tags: ['pentesting', 'lab'],
    date: '2023-05-01',
  },
  {
    src: 'Pseudoclases y pseudoelementos.md',
    dest: 'desarrollo/pseudoclases-pseudoelementos.md',
    title: 'Pseudoclases y pseudoelementos CSS',
    tags: ['css', 'frontend'],
    date: '2023-10-31',
  },
  {
    src: 'Seguridad en ambientes multi-cuenta AWS.md',
    dest: 'aws/seguridad-multi-cuenta-aws.md',
    title: 'Seguridad en ambientes multi-cuenta AWS',
    description: 'SCP, IAM, Control Tower y arquitectura de cuentas.',
    tags: ['aws', 'multi-cuenta', 'scp'],
    date: '2023-08-14',
  },
  {
    src: 'Teoría de inteligencias múltiples según Gardner.md',
    dest: 'general/teoria-inteligencias-multiples-gardner.md',
    title: 'Teoría de inteligencias múltiples según Gardner',
    tags: ['educación', 'psicología'],
    date: '2023-02-28',
  },
  {
    src: 'Tratamiento de la TTY.md',
    dest: 'pentesting/tratamiento-tty.md',
    title: 'Tratamiento de la TTY',
    tags: ['pentesting', 'shell', 'tty'],
    date: '2023-05-05',
  },
  {
    src: 'Vulnerabilidades 192.168.1.72.md',
    dest: 'pentesting/vulnerabilidades-centreon-lab.md',
    title: 'Vulnerabilidades Centreon — Laboratorio',
    description: 'Notas de laboratorio sobre Centreon y RCE (IPs y credenciales redactadas).',
    tags: ['pentesting', 'lab', 'centreon'],
    date: '2023-05-20',
  },
  {
    src: 'Vulnerabilidades en SO 192.168.1.61.md',
    dest: 'pentesting/vulnerabilidades-eternalblue-lab.md',
    title: 'Vulnerabilidades EternalBlue — Laboratorio',
    description: 'Escaneo y explotación en entorno de lab (datos sensibles redactados).',
    tags: ['pentesting', 'lab', 'metasploit'],
    date: '2023-05-19',
  },
  {
    src: 'WFUZZ tutorial.md',
    dest: 'pentesting/wfuzz-tutorial.md',
    title: 'WFUZZ — Tutorial',
    tags: ['wfuzz', 'pentesting', 'fuzzing'],
    date: '2023-05-01',
  },
  {
    src: 'WordPress en GoogleCloud.md',
    dest: 'infra/wordpress-google-cloud.md',
    title: 'WordPress en Google Cloud',
    tags: ['gcp', 'wordpress', 'cloud'],
    date: '2024-01-11',
  },
  {
    src: 'Configuración de Mesh HAWEI-.md',
    dest: 'infra/configuracion-mesh-huawei.md',
    title: 'Configuración de Mesh Huawei',
    tags: ['redes', 'huawei', 'wifi'],
    date: '2025-09-04',
  },
  {
    src: 'Creando API Rest con NestJS.md',
    dest: 'desarrollo/api-rest-nestjs.md',
    title: 'Creando API REST con NestJS',
    tags: ['nestjs', 'nodejs', 'backend'],
    date: '2023-12-06',
  },
  {
    src: 'Creando CRUD Angular + Firestore + RXJS.md',
    dest: 'desarrollo/crud-angular-firestore-rxjs.md',
    title: 'CRUD Angular + Firestore + RXJS',
    description: 'Configuración de Angular 16, Tailwind, Material y Firebase (claves redactadas).',
    tags: ['angular', 'firebase', 'frontend'],
    date: '2023-12-20',
  },
];

function formatMarkdown(body) {
  let text = body;
  text = text.replace(/```#?([\w+-]*):/g, '```$1');
  text = text.replace(
    /```\n((?:ng |npm |nmap |wfuzz |stty |script |export |xsltproc|reset )[^\n]+)\n```/g,
    '```bash\n$1\n```',
  );
  text = text.replace(/\n\t([^\n]+)/g, '\n\n- $1');
  text = text.replace(/^(-[\w-]+)\s*->\s*(.+)$/gm, '- **$1** — $2');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

function sanitize(content) {
  let text = content;

  // Firebase config — replace real keys with placeholders
  text = text.replace(
    /firebaseConfig\s*:\s*\{[\s\S]*?\n\s*\}/,
    `firebaseConfig: {
        // Obtén estos valores en Firebase Console — no publiques claves reales
        apiKey: "YOUR_API_KEY",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      }`,
  );

  // AWS account IDs inside ARNs
  text = text.replace(/arn:aws:[a-z0-9-]+:[a-z0-9-]*:\d{12}:/gi, (m) =>
    m.replace(/\d{12}/, '<ACCOUNT-ID>'),
  );
  text = text.replace(/\b\d{12}\b/g, '<ACCOUNT-ID>');

  // Private / lab IPs
  text = text.replace(/\b192\.168\.\d{1,3}\.\d{1,3}\b/g, '<LAB-IP>');
  text = text.replace(/\b10\.9\.75\.18\b/g, '<ATTACKER-IP>');

  // Lab credentials
  text = text.replace(
    /admin\/centreon/gi,
    'admin/<REDACTED>',
  );
  text = text.replace(
    /^usuario:\s*user\s*\ncontraseña:\s*user\s*$/gim,
    'usuario: `<lab-user>`\ncontraseña: `<lab-password>` *(credenciales de laboratorio)*',
  );
  text = text.replace(
    /Ahí podemos ver la contraseña en texto claro\./gi,
    '*(Resultado del crackeo omitido — laboratorio local)*',
  );

  // Obsidian highlights
  text = text.replace(/==([^=\n]+)==/g, '<mark>$1</mark>');

  // Wiki links to notes — strip (skip image embeds ![[...]])
  text = text.replace(/(?<!!)\[\[([^\]|]+)(?:\|([^\]]+))?\]\](?!\s*->)/g, (_, file, alias) => alias ?? file);

  // Remove broken embeds (pdf, webm, audio)
  text = text.replace(/^.*\[\[(?:aia\.pdf|Recording[^\]]+\.webm)[^\]]*\]\].*$/gim, '');
  text = text.replace(/^.*!\[\[(?:aia\.pdf|Recording[^\]]+\.webm)[^\]]*\]\].*$/gim, '');

  // iframes → YouTube links
  text = text.replace(
    /<iframe[^>]*src="([^"]+)"[^>]*><\/iframe>/gi,
    (_, src) => `\n> Video: ${src}\n`,
  );

  return text.trim();
}

function extractImageRefs(content) {
  const refs = new Set();
  const wikiImg = /!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  let m;
  while ((m = wikiImg.exec(content)) !== null) {
    const name = m[1].trim();
    if (/\.(png|jpe?g|webp|gif)$/i.test(name)) refs.add(name);
  }
  return [...refs];
}

function convertImages(content) {
  return content.replace(
    /!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g,
    (_, file, alt) => {
      const name = file.trim();
      if (!/\.(png|jpe?g|webp|gif)$/i.test(name)) return '';
      const encoded = encodeURIComponent(name).replace(/%2F/g, '/');
      const label = alt?.trim() || path.basename(name, path.extname(name));
      return `![${label}](/vault-imgs/${encoded})`;
    },
  );
}

function buildFrontmatter({ title, description, tags, date }) {
  const lines = ['---', `title: "${title.replace(/"/g, '\\"')}"`];
  if (description) lines.push(`description: "${description.replace(/"/g, '\\"')}"`);
  if (date) lines.push(`date: ${date}`);
  if (tags?.length) lines.push(`tags: ${JSON.stringify(tags)}`);
  lines.push('---', '');
  return lines.join('\n');
}

function copyImage(filename) {
  const src = path.join(IMGS_SOURCE, filename);
  const dest = path.join(IMGS_DEST, filename);
  if (!fs.existsSync(src)) {
    console.warn(`  ⚠ Imagen no encontrada: ${filename}`);
    return false;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

function wipeVault() {
  if (fs.existsSync(VAULT_DIR)) {
    fs.rmSync(VAULT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(VAULT_DIR, { recursive: true });
}

function wipeVaultImages() {
  if (fs.existsSync(IMGS_DEST)) {
    fs.rmSync(IMGS_DEST, { recursive: true, force: true });
  }
  fs.mkdirSync(IMGS_DEST, { recursive: true });
}

wipeVault();
wipeVaultImages();

const allImages = new Set();
let imported = 0;

for (const note of NOTES) {
  const srcPath = path.join(SOURCE_DIR, note.src);
  if (!fs.existsSync(srcPath)) {
    console.error(`✗ No encontrado: ${note.src}`);
    continue;
  }

  let raw = fs.readFileSync(srcPath, 'utf8');
  for (const img of extractImageRefs(raw)) allImages.add(img);

  raw = convertImages(raw);
  raw = sanitize(raw);
  raw = formatMarkdown(raw);

  const destPath = path.join(VAULT_DIR, note.dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buildFrontmatter(note) + raw + '\n', 'utf8');
  console.log(`✓ ${note.dest}`);
  imported++;
}

let copiedImages = 0;
for (const img of allImages) {
  if (copyImage(img)) copiedImages++;
}

console.log(`\nImportados: ${imported} apuntes, ${copiedImages} imágenes → public/vault-imgs/`);
