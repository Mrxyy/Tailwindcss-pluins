# Tailwindcss-pluins
+ Provite useful plugins for tailwind-css
```javascript
//tailwind.config.js
const {selectorWeight} = require('tailwindcss-pluins');
module.exports = {
  // ...
   plugins: [selectorWeight],
}
```
## plugins list
+ selectorWeight
  - p&: weight add 0001
  - &: weight add 0010
> use:
```javascript
   <p className="&:p&:&:text-red ">test</p>
```
> compiler
```css
/* &:p&:&:text-red */
.\&\:p\&\:\&\:text-red[class*=\&\:text-red]:not(script)[class*=\&\:text-red] {
    color: var(--red);
}
```

+ dynamicThemes
  - dynamicThemes({colors,callbackFX})
    - colors: colors config object
    - callbackFX: hanlder done callback,pramters is cssMap、cssRaw、colorsConfig
> use:
```javascript
const designColors = {
  //base colors
  red: '#FF4646',
  orange: '#FF5800',
  green: '#14A22F',
  blue: '#2239BC',
  brown: {
    default: '#FFDDCB',
    100: '#FFC2A2',
    200: '#FFA474',
  },
  cyan: '#B7F2C2',
  skyBlue: '#00A7FF',
  lightBlue: '#0076FF',
  white: '#ffffff',
  //
  warning: '$red',
  highlight: '$orange',
  good: '$green',
  disable: '#cccccc',
  'border-color': '#EEEEEE',
  'bg-primary': '#F7F7F7',
  'bg-primary-btn': '$brown',
  light: '$white',
  dark: '$black',
  content: '#999999',
  'title-primary': '#333333',
  'title-sub': '#666666',

  black: {
    default: '#000000',
    '300': '#333',
    '400': '#3D3D3D',
  },
  yellow: {
    '300': '$orange',
  },
}
const dynamicThemes = require('tailwindcss-pluins/dynamicThemes')({
  colors: designColors,
  callbackFX: (args) => console.log(args),
});
 module.export = {
  // ...
  plugins: [dynamicThemes],
 }
```
> compiler
```css
:root, body {
    --red: #FF4646;
    --orange: #FF5800;
    --green: #14A22F;
    --blue: #2239BC;
    --brown-100: #FFC2A2;
    --brown-200: #FFA474;
    --brown: #FFDDCB;
    --cyan: #B7F2C2;
    --sky-blue: #00A7FF;
    --light-blue: #0076FF;
    --white: #ffffff;
    --warning: var(--red);
    --highlight: var(--orange);
    --good: var(--green);
    --disable: #cccccc;
    --border-color: #EEEEEE;
    --bg-primary: #F7F7F7;
    --bg-primary-btn: var(--brown);
    --light: var(--white);
    --dark: var(--black);
    --content: #999999;
    --title-primary: #333333;
    --title-sub: #666666;
    --black-300: #333;
    --black-400: #3D3D3D;
    --black: #000000;
    --yellow-300: var(--orange);
}
```
```javascript
// colors config
  {
    red: 'var(--red)',
    orange: 'var(--orange)',
    green: 'var(--green)',
    blue: 'var(--blue)',
    brown: {
      '100': 'var(--brown-100)',
      '200': 'var(--brown-200)',
      default: 'var(--brown)',
      DEFAULT: 'var(--brown)'
    },
    cyan: 'var(--cyan)',
    skyBlue: 'var(--sky-blue)',
    lightBlue: 'var(--light-blue)',
    white: 'var(--white)',
    warning: 'var(--warning)',
    highlight: 'var(--highlight)',
    good: 'var(--good)',
    disable: 'var(--disable)',
    'border-color': 'var(--border-color)',
    'bg-primary': 'var(--bg-primary)',
    'bg-primary-btn': 'var(--bg-primary-btn)',
    light: 'var(--light)',
    dark: 'var(--dark)',
    content: 'var(--content)',
    'title-primary': 'var(--title-primary)',
    'title-sub': 'var(--title-sub)',
    black: {
      '300': 'var(--black-300)',
      '400': 'var(--black-400)',
      default: 'var(--black)',
      DEFAULT: 'var(--black)'
    },
    yellow: { '300': 'var(--yellow-300)' }
  }
```