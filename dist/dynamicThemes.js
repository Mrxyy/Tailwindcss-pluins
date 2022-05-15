'use strict';

var lodash = require('lodash');

require('path');
require('fs');
const plugin = require('tailwindcss/plugin');

const generatorCss = [];
const generatorCssMap = {};
function transformCssVal(val) {
  if (lodash.startsWith(val, '$')) {
    return `var(--${lodash.kebabCase(val.slice(1))})`;
  }
  return val;
}
function start(_designColors, perfix = '') {
  lodash.map(_designColors, (val, key) => {
    if (lodash.isObject(val)) {
      start(val, `${perfix} ${key}`);
    } else {
      const variableName = `--${lodash.kebabCase(
        key === 'default' ? `${perfix}` : `${perfix} ${key}`
      )}`;
      generatorCss.push(`${variableName}:${transformCssVal(val)};`);
      generatorCssMap[variableName] = transformCssVal(val);
      if (key === 'default') {
        _designColors[key.toLocaleUpperCase()] = `var(${variableName})`;
      }
      _designColors[key] = `var(${variableName})`;
    }
  });
}

function setDynamicThemes(designColors) {
  start(designColors);
  return {
    designColors,
    generatorCss,
    generatorCssMap,
  };
}

let dynamicThemes = {};
var dynamicThemes$1 = plugin.withOptions(
  (options = {
    colors: {},
  }) => {
    dynamicThemes = setDynamicThemes(lodash.cloneDeep(options.colors));
    options.callbackFX && options.callbackFX(dynamicThemes);
    return function ({ addBase }) {
      addBase({
        ':root,body': dynamicThemes.generatorCssMap,
      });
    };
  },

  () => {
    return {
      theme: {
        extend: {
          colors: dynamicThemes.designColors,
        },
      },
    };
  }
);

module.exports = dynamicThemes$1;
