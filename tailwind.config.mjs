/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg:        '#070B14',
        surface:   '#0D1526',
        border:    '#162035',
        accent:    '#3B82F6',
        secondary: '#0EA5E9',
        highlight: '#F59E0B',
        text:      '#F1F5F9',
        muted:     '#475569',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        btn:  '8px',
        card: '14px',
      },
    },
  },
  plugins: [],
};
