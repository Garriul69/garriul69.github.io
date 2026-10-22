/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg:        '#FFFFFF',
        surface:   '#F5F5F7',
        border:    '#DCE2E8',
        accent:    '#0B5F6B',
        secondary: '#2B6CB0',
        highlight: '#B7791F',
        text:      '#12202B',
        muted:     '#5B6773',
      },
      fontFamily: {
        display: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        body:    ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        btn:  '980px',
        card: '18px',
      },
    },
  },
  plugins: [],
};
