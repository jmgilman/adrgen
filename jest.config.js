/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "testMatch": [
      '**/*.test.ts',
      '**/*.steps.ts'
  ],
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "globals": {
    "ts-jest": {
        "compiler": "ttypescript"
    }
  }
};