module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/*.spec.js'
  ],
  transformIgnorePatterns: ["node_modules/(?!axios)"],
}
