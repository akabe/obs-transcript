module.exports = {
  presets: [
    [
      "@babel/preset-env"
    ]
  ],
  env: {
    test: {
      plugins: [
        "babel-plugin-transform-es2015-modules-commonjs",
      ],
    },
  },
};
