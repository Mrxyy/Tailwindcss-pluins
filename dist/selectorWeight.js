'use strict';

const plugin = require('tailwindcss/plugin');
const addWeights = plugin(function ({ addVariant, e }) {
  addVariant('&', (args) => {
    const { container } = args;
    return (
      '&[class*=' + e(`&:${container.nodes[0].selector.slice(1)}`) + ']' //属性选择器的权重和class 选择器权重一样，权重加 + 0010
    );
  });
  addVariant('p&', '&:not(script)'); //权重 + 0001
});

module.exports = addWeights;
