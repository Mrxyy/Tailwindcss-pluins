
export default {
  input: ['index.js',"./plugins/selectorWeight.js","./plugins/dynamicThemes.js"],
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  external:["tailwindcss/plugin"]
}
