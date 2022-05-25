module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2022: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",  
  },
  rules: {
    eqeqeq: "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};
