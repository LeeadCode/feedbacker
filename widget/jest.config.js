module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  testMatch: [
    '**/*.spec.js'
  ],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
      '^@/(.*)': ['<rootDir>/src/$1'],
  },
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
}
