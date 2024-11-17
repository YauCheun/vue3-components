module.exports = {
  "env": {
    "es2021": true,
    "browser": true,
    "node": true,
  },
  // 🟡 经过 extends 的拆解，相关零散配置项拼凑起来
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/eslint-config-typescript/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": '@typescript-eslint/parser',
    "sourceType": 'module',
  },
  "rules": {
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off'
  },
  globals:{
    defineProps: 'readonly'
  }
}
