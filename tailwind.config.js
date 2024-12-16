/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  complilerOptions: {
    "types": ["@testing-library/jest-dom"],
  }
};
