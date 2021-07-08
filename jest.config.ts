/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
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
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true
}
