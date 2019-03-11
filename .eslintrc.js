module.exports = {
  extends: ["airbnb", "eslint-config-prettier"],
  parser: "babel-eslint",
  env: {
    browser: true,
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "jsx-a11y/media-has-caption": [0],
    "no-await-in-loop": [0],
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "max-len": [0],
    "react/prefer-stateless-function": [0],
    "react/destructuring-assignment": [0],
    "react/no-access-state-in-setstate": [0],
    "no-console": [0],
    "react/jsx-one-expression-per-line": [0],
    "react/forbid-prop-types": [0],
    "react/no-unused-prop-types": [0],
  },
};
