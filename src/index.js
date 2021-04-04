// example used: https://github.com/testing-library/eslint-plugin-testing-library/blob/main/lib/index.ts
const allRules = {
  'verify-classes-prop': require('./rules/verify-classes-prop'),
}

const recommendedRules = {
  'responsive-lite/verify-class-props': 'error',
}

module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      plugins: ['responsive-lite'],
      rules: recommendedRules,
    },
    react: {
      plugins: ['responsive-lite'],
      rules: {
        ...recommendedRules,
        // fill in extra rules if needed in future for example:
        // 'testing-library/no-debug': 'warn',
        // 'testing-library/no-dom-import': ['error', 'react'],
      },
    },
    all: {
      plugins: ['responsive-lite'],
      rules: recommendedRules,
    },
  },
}

// env: {
//   es6: true,
// },
// parserOptions: {
//   ecmaVersion: 2021,
//     sourceType: 'module',
// },
// plugins: ['ava'],
//   rules: {
//   'responsive-lite/verify-class-props': 'error/',
// },
