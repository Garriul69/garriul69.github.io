/** Envuelve <pre> de Shiki en <div class="code-block"> en build time. */
export function rehypeCodeBlockWrapper() {
  return (tree) => {
    const walk = (node) => {
      if (!node?.children?.length) return;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'element' && child.tagName === 'pre') {
          const props = child.properties ?? {};
          const lang = props['data-language'] ?? props.dataLanguage ?? 'code';
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['code-block'],
              dataLang: String(lang),
            },
            children: [child],
          };
        } else {
          walk(child);
        }
      }
    };

    walk(tree);
  };
}
