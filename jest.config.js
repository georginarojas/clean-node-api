/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!**/test/**'
  ],

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  watchPathIgnorePatterns: ['globalConfig']

  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  // moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  // collectCoverage: true,
  // clearMocks: true
}
