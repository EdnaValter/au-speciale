import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#f7fafc',
        foreground: '#1f2937',
        primary: {
          DEFAULT: '#1d4ed8',
          foreground: '#ffffff'
        },
        muted: {
          DEFAULT: '#e5e7eb',
          foreground: '#374151'
        },
        success: '#166534',
        warning: '#92400e'
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.7' }]
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem'
      }
    }
  },
  plugins: []
};

export default config;
