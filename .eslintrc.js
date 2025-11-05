// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  env: {
    jest: true,
  },
  overrides: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}', 'jest.setup.js', '__tests__/**/*'],
      env: {
        jest: true,
      },
      globals: {
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
    },
  ],
};
