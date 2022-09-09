const defaultTheme = require('tailwindcss/defaultTheme');
const postcss = require('postcss');

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'items-start',
    'items-end',
    'items-stretch',
    'items-center',
    'justify-items-start',
    'justify-items-end',
    'justify-items-center',
    'justify-items-stretch',
  ],
  theme: {
    fontSize: {
      size0: ['155px', '122px'], // Heading 0
      size1: ['128px', '114px'], // Heading 1
      size2: ['83px', '71px'], // Heading 2
      size3: ['60px', '57px'], // Heading 3
      size4: ['42px', '38px'], // Heading 4
      size5: ['30px', '36px'], // Heading 5
      size6: ['18px', '24px'], // Heading 6
      large: ['20px', '33px'], // Body large
      base: ['16px', '27px'], // Body regular
      small: ['11px', '18px'], // Body small
      menu: ['17px', '20px'], // Menu
      'menu-mobile': ['15px', '18px'],
      table: ['14px', '20px'],
    },
    extend: {
      borderRadius: {
        DEFAULT: '10px',
      },
      fontFamily: {
        sans: ['franklin-gothic-urw', ...defaultTheme.fontFamily.sans],
        cond: ['franklin-gothic-urw-cond', ...defaultTheme.fontFamily.sans],
        serif: ['garamond-premier-pro', ...defaultTheme.fontFamily.sans],
      },
      margin: {
        'gutter-desktop': '70px',
        'gutter-mobile': '35px',
      },
      padding: {
        'gutter-desktop': '70px',
        'gutter-mobile': '35px',
      },
      screens: {
        narrow: '1024px',
        xl: '1440px',
        max: '1580px',
        maxPadded: '1720px',
        flat: {
          raw: '(max-height: 700px) and (orientation: landscape)',
        },
        flatter: {
          raw: '(max-height: 500px) and (orientation: landscape)',
        },
      },
      letterSpacing: {
        tightest: '-.05em',
        tighter: '-.04em',
        tight: '-.03em',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-23': 'span 23 / span 23',
      },
      gridColumnStart: {
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
      },
      colors: {
        red: withOpacityValue('--color-red'),
        black: {
          100: withOpacityValue('--color-black-100'),
          200: withOpacityValue('--color-black-200'),
          300: withOpacityValue('--color-black-300'),
          400: withOpacityValue('--color-black-400'),
          500: withOpacityValue('--color-black-500'),
          600: withOpacityValue('--color-black-600'),
        },
        white: withOpacityValue('--color-white'),
        modal: {
          dark: 'rgba(11, 10, 10, 0.9)',
          light: 'rgba(255, 255, 255, 0.72)',
        },
      },
      spacing: {
        22: '22px',
        30: '30px',
      },
      blur: {
        xss: '2px',
        xs: '3px',
      },
      boxShadow: {
        modal: '0 0 10px rgba(0, 0, 0, 0.25)',
      },
      visibility: ['group-hover'],
    },
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant('first-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`first-child${separator}${className}`)} >*:first-child`;
        });
      });
      addVariant('supports-blur', ({ container, separator }) => {
        const supportsRule = postcss.atRule({
          name: 'supports',
          params: '(backdrop-filter: blur(1px))',
        });
        supportsRule.append(container.nodes);
        container.append(supportsRule);
        supportsRule.walkRules((rule) => {
          rule.selector = `.${e(
            `supports-blur${separator}`,
          )}${rule.selector.slice(1)}`;
        });
      });
    },
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')({
      target: 'legacy',
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
};
