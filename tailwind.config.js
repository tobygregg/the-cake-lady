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
        // Chocolate — the cake boards and ganache in her photos
        // (#3a2414 in the Facebook banner). Text, outlines, dark sections.
        cocoa: {
          DEFAULT: '#3A2414',
          900: '#26170C',
          700: '#553621',
          400: '#8C6B55',
        },
        // Cream — iced sponge and the white cake boxes
        cream: {
          DEFAULT: '#FFF5E6',
          50: '#FFFBF4',
          200: '#F7E8D2',
        },
        // Strawberry — her pink cupcake boxes and the new-baby cake, turned up
        berry: {
          DEFAULT: '#EE7A98',
          light: '#FFD3DE',
          pale: '#FFE9EE',
          dark: '#C1446A', // pink text on cream
        },
        // Buttercup — the cheese cake, the DeWalt yellow and her sugar hearts
        butter: {
          DEFAULT: '#FFCB45',
          light: '#FFE59A',
        },
        // Pistachio — the piped grass on the golf cupcakes (small accents only)
        pistachio: '#9FD08A',
        muted: '#6E5444', // body copy on cream
      },
      fontFamily: {
        display: ['Shrikhand', 'Georgia', 'serif'],
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        hand: ['"Gochi Hand"', 'cursive'], // little handwritten notes only
      },
      maxWidth: {
        site: '1240px',
      },
      boxShadow: {
        sticker: '0 0 0 3px #3A2414, 7px 8px 0 #3A2414',
        'sticker-sm': '0 0 0 2.5px #3A2414, 4px 5px 0 #3A2414',
        btn: '0 5px 0 #26170C',
        'btn-cream': '0 5px 0 #3A2414',
      },
    },
  },
  plugins: [],
};
