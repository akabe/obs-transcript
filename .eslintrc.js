module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "riot"
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  },
  "globals": {
    "webkitSpeechRecognition": true,
    "SpeechRecognition": true
  }
};
