import { defineConfig } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      angular: {
        red: '#dd0031',
        pink: '#e23dae',
        purple: '#8f2cd8',
      },
    },
  },
  shortcuts: {
    'text-angular': 'text-[#8f2cd8]',
    'text-angular-red': 'text-[#dd0031]',
    'bg-angular': 'bg-gradient-to-r from-[#e23dae] to-[#8f2cd8]',
    'border-angular': 'border-[#8f2cd8]',
  },
});
