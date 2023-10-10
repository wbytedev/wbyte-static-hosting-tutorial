const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./**/*.tsx"],
  media: false, // or 'media' or 'class'
  theme: {
    colors: {
      slate: colors.slate,
      blue: colors.blue,
      sky: colors.sky,
      white: colors.white,
      black: colors.black,
    },
    extend: {
      colors: {
        lavender: `#ede8e6`,
        carrot: `#feb10c`,
        wblue: `#0179aa`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require(`tailwind-scrollbar-hide`)],
};
