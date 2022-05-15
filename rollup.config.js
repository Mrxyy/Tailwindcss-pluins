
export default {
  input: ['index.js',"./plugins/selectorWeight.js"],
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  external:["tailwindcss/plugin"]
}
