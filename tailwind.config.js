/** ============================================================
 *  Tailwind config — The Cake Lady Guernsey
 *  Brand colours + fonts live here. Change them once, rebuild
 *  (npm run build) and the whole site updates.
 *  ============================================================ */
module.exports = {
  content: ['./index.html', './thanks.html', './404.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Cocoa — the dark chocolate brown of the cake boards and ganache
        // in her photos (#3a2414 in the Facebook banner). Text + dark sections.
        cocoa: {
          DEFAULT: '#3A2414',
          900: '#24160C',
          800: '#2F1D10',
          700: '#4A2F1C',
          600: '#6B4A33',
          400: '#9A8566', // the warm taupe from the profile photo
        },
        // Buttercream — page background, from the cream boxes and icing
        cream: {
          DEFAULT: '#FBF5EA',
          50: '#FFFDF8',
          200: '#F4E9D6',
          300: '#E9DAC0', // close to #d2c6b8 in the banner, lifted
        },
        // Rose — the blush pink of her cupcake boxes and the new-baby cake
        rose: {
          DEFAULT: '#E98A9E',
          light: '#F8D3D4',
          pale: '#FCEBE8',
          dark: '#B4445D', // pink text on cream (passes AA)
        },
        // Gold — sugar hearts and cheese yellow (#d6ab34 in the profile photo)
        gold: {
          DEFAULT: '#D6AB34',
          light: '#F0D27A',
          dark: '#A9831A',
        },
        muted: '#6B5444', // body copy on cream
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        card: '0 1px 0 #fff inset, 0 24px 50px -28px rgba(58,36,20,.45)',
        lift: '0 30px 60px -30px rgba(58,36,20,.55)',
        btn: '0 4px 0 #24160C',
        'btn-rose': '0 4px 0 #B4445D',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};
