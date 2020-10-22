module.exports = {
  testMatch: [
    "**/tests/**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    "^.+\\.js$": '<rootDir>/node_modules/babel-jest',
  },
  collectCoverageFrom: [
    "**/src/**/*.js",
    "!**/node_modules/**",
  ],
};
