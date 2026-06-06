import type { CollectionEntry } from 'astro:content';

export type VaultNote = CollectionEntry<'vault'>;

export interface VaultTreeFolder {
  type: 'folder';
  name: string;
  path: string;
  children: VaultTreeNode[];
}

export interface VaultTreeNote {
  type: 'note';
  name: string;
  slug: string;
  note: VaultNote;
}

export type VaultTreeNode = VaultTreeFolder | VaultTreeNote;

export function getPublishedNotes(notes: VaultNote[]): VaultNote[] {
  return notes
    .filter((n) => !n.data.draft)
    .sort((a, b) => {
      const dateA = a.data.date?.getTime() ?? 0;
      const dateB = b.data.date?.getTime() ?? 0;
      if (dateA !== dateB) return dateB - dateA;
      return a.data.title.localeCompare(b.data.title, 'es');
    });
}

export function buildVaultTree(notes: VaultNote[]): VaultTreeNode[] {
  const root: VaultTreeFolder = { type: 'folder', name: '', path: '', children: [] };

  for (const note of notes) {
    const parts = note.slug.split('/');
    let current = root;

    for (let i = 0; i < parts.length - 1; i++) {
      const folderName = parts[i];
      const folderPath = parts.slice(0, i + 1).join('/');
      let folder = current.children.find(
        (c): c is VaultTreeFolder => c.type === 'folder' && c.name === folderName,
      );

      if (!folder) {
        folder = { type: 'folder', name: folderName, path: folderPath, children: [] };
        current.children.push(folder);
      }
      current = folder;
    }

    const fileName = parts[parts.length - 1];
    current.children.push({
      type: 'note',
      name: fileName,
      slug: note.slug,
      note,
    });
  }

  const sortNodes = (nodes: VaultTreeNode[]): VaultTreeNode[] =>
    nodes
      .map((node) =>
        node.type === 'folder'
          ? { ...node, children: sortNodes(node.children) }
          : node,
      )
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        const labelA = a.type === 'folder' ? a.name : a.note.data.title;
        const labelB = b.type === 'folder' ? b.name : b.note.data.title;
        return labelA.localeCompare(labelB, 'es');
      });

  return sortNodes(root.children);
}

export function getAllTags(notes: VaultNote[]): string[] {
  const tags = new Set<string>();
  for (const note of notes) {
    note.data.tags.forEach((tag) => tags.add(tag));
  }
  return [...tags].sort((a, b) => a.localeCompare(b, 'es'));
}

export function formatVaultDate(date: Date | undefined): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function slugToTitle(slug: string): string {
  const last = slug.split('/').pop() ?? slug;
  return last
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
