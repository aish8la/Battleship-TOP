import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier"


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules", "dist", "eslint.config.js", "webpack.common.js", "webpack.dev.js", "webpack.prod.js"],
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];