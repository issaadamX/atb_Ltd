/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./admin/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        navy: 'hsl(var(--primary))',
        accent: 'hsl(var(--accent))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'navy-dark': 'hsl(var(--navy-dark))',
        'navy-light': 'hsl(var(--navy-light))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
