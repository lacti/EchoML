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
  },
};
