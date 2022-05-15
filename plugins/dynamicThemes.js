const path = require('path');
const fs = require('fs');
import { cloneDeep, isObject, kebabCase, map, startsWith } from "lodash";
const plugin = require('tailwindcss/plugin');

const generatorCss = [];
const generatorCssMap = {};
function transformCssVal(val) {
  if (startsWith(val, '$')) {
    return `var(--${kebabCase(val.slice(1))})`;
  }
  return val;
}
function start(_designColors, perfix = '') {
  map(_designColors, (val, key) => {
    if (isObject(val)) {
      start(val, `${perfix} ${key}`);
    } else {
      const variableName = `--${kebabCase(
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
export default plugin.withOptions(
  (options = {
    colors: {},
  }) => {
    dynamicThemes = setDynamicThemes(cloneDeep(options.colors));
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
